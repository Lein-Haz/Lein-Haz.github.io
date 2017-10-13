import {Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import {MyMarker} from "../shared/google-map/mapModels/myMarker";
import {MdChipList, MdChip, MdSlideToggleChange, MdSlideToggle} from "@angular/material";
import {MapService} from "../../core/services/map.service";

@Component({
  selector: 'app-map-stuff',
  templateUrl: './map-stuff.component.html',
  styleUrls: ['./map-stuff.component.scss']
})
export class MapStuffComponent implements OnInit {

  public markerList: MyMarker[] = [];
  private selectLimit: number = 2;
  private mapRef: google.maps.Map;

  private selectedPath: google.maps.Polyline;
  public distanceBetween: number = 0;

  public useMetric: boolean = true;//controls whether to use metric or the other output
  public pushSecondSelected: boolean = false;

  @ViewChild('chipList') chipList: MdChipList;
  @ViewChild('toggler') toggler: MdSlideToggle;

  constructor(private ref: ChangeDetectorRef, private mapService: MapService) { }

  remove(myMarkerObj, chipReference){
    let markerIndex = this.markerList.map((marker)=>{return marker.id}).indexOf(myMarkerObj.id);
    let deletedMarker = this.markerList.splice(markerIndex,1);
    deletedMarker[0].setMap(null);
    this.ref.detectChanges();
  }

  //gets called for every chip on add or remove
  selectionChange($event){
    let thisChip = $event.source;
    let thisMarker = $event.source.value;

    if($event.isUserInput){//only call when the change was user initiated from a non-click
      if(thisChip.selected !== thisMarker.selected){
        thisChip.selected = thisMarker.selected;
      }
      this.limitSelection(thisChip);
    }

    if(thisMarker.selected && (thisChip.selected !== thisMarker.selected)){
      /*
      * Keeps chip marked as selected if the matching marker is set to selected
      */
      $event.source.select();
    }
    this.pathLineHandler();
  }

  pathLineHandler(){
    let selArray = this.chipList.selected as MdChip[];

    if(selArray.length === this.selectLimit){//if we have two point draw a line
      //console.log("draw line");
      let start = selArray[0].value.getPosition();//0 always start, selArray can only have 2 items
      let end = selArray[1].value.getPosition();//1 always end, selArray can only have 2 items
      if(this.selectedPath && this.selectedPath.getMap() !== null){//if we are switching points
        this.selectedPath.setMap(null);// remove the old line first
      }
      this.selectedPath = this.mapService.drawPath(start, end, this.mapRef);//draw line
      this.distanceBetween = MapService.getPolyLineLength(this.selectedPath);
    }else{//else remove the line
      //console.log("no draw line");
      if(this.selectedPath){//if there is a line to remove, remove it
        this.selectedPath.setMap(null);
        this.distanceBetween = 0;
      }
    }
  }

  metricToggleChanged(toggleChange: MdSlideToggleChange){
    console.log(toggleChange.checked);
    this.useMetric = toggleChange.checked;
  }

  extraToggleClick(){
    this.useMetric = !this.toggler.checked;
  }

  chipSelectionClick($event, clickedMarker: MyMarker){
    let findId = clickedMarker.id;

    let chipReference = this.chipList.chips.find((chipo, index)=>{
      let markerVal = chipo.value as MyMarker;
      return markerVal.id == findId;
    });

    this.limitSelection(chipReference);
    this.ref.detectChanges();
  }

  limitSelection(chipRef: MdChip){
    let selArray = this.chipList.selected as MdChip[];

    if(chipRef.selected){//always allow selected chips to be deselected
      this.chipDeselectHandler(chipRef);
    }else{//otherwise check against selection limit
      if(selArray.length >= this.selectLimit){//if we are at the selection limit
        if(this.pushSecondSelected){
          this.chipDeselectHandler(this.chipList.selected[1]);
        }else{
          this.chipDeselectHandler(this.chipList.selected[0]);
        }
        this.chipSelectHandler(chipRef);
      }else{//if not at the selection limit toggle freely
        this.chipSelectHandler(chipRef);
      }
    }
    this.pathLineHandler();
  }

  public getDistance(): number{
    let returnDis = 0;
    if(this.useMetric){
      returnDis = this.distanceBetween;
    }else{
      returnDis = MapService.convertMetersToMiles(this.distanceBetween);
    }
    return returnDis;
  }

  public getDistanceLabel(): string{
    if(this.useMetric){
      return " M";
    }else{
      return " miles";
    }
  }

  chipDeselectHandler(chip: MdChip){
    if(chip.value){
      chip.value.selected = false;
    }
    chip.deselect();//triggers call to selectionChange
    this.mapService.setMarkerSelected(chip.value);
    this.setSelectedArrayMarkers();
  }

  chipSelectHandler(chip: MdChip){
    if(chip.value){
      chip.value.selected = true;
    }
    chip.select();//triggers call to selectionChange
    this.setSelectedArrayMarkers();
  }

  setSelectedArrayMarkers(){
    let selArr = this.chipList.selected as MdChip[];
    selArr.forEach((chip, index:number)=>{
      this.mapService.setMarkerSelected(chip.value, index);
    });
  }

  focused($event, marker: MyMarker){
    MapService.bounceMarker(marker);
  }

  blurred($event, marker: MyMarker){
    MapService.bounceMarker(marker);
  }

  markerListAdd(marker: MyMarker){
    this.ref.detectChanges();
  }

  mapInitHandler(map: google.maps.Map){
    this.mapRef = map;
  }

  ngOnInit() {
  }
}
