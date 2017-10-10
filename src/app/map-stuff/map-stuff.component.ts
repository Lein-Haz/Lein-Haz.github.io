import {Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import {MyMarker} from "../shared/google-map/mapModels/myMarker";
import {MdChipList, MdChip} from "@angular/material";
import {WindowRef} from "../../core/services/window.ref";
import {MapService} from "../../core/services/map.service";
import {MyMap} from "../shared/google-map/mapModels/myMap";
import {MyPolyline} from "../shared/google-map/mapModels/myPolyline";

@Component({
  selector: 'app-map-stuff',
  templateUrl: './map-stuff.component.html',
  styleUrls: ['./map-stuff.component.scss']
})
export class MapStuffComponent implements OnInit {

  public markerList: MyMarker[] = [];
  private selectLimit: number = 2;
  private mapRef: MyMap;

  private selectedPath: MyPolyline;
  public distanceBetween: number;

  @ViewChild('chipList') chipList: MdChipList;

  constructor(private ref: ChangeDetectorRef, private windowRef: WindowRef, private mapService: MapService) { }

  remove(myMarkerObj, chipReference){
    //console.log("Removal time");
    let chip = chipReference as MdChip;
    console.log(myMarkerObj);
    let markerIndex = this.markerList.map((marker)=>{return marker.id}).indexOf(myMarkerObj.id);
    console.log("found at index "+markerIndex);
    let deletedMarker = this.markerList.splice(markerIndex,1);
    deletedMarker[0].setMap(null);
    this.ref.detectChanges();
  }

  selectionChange($event){
    let thisChip = $event.source;
    let thisMarker = $event.source.value;
    //console.log("DIS HERE BE " + $event.selected + " for the marker: " + thisMarker.id);
    //console.log($event.source.value);

    if(thisMarker.selected && (thisChip.selected !== thisMarker.selected)){
      $event.source.select();
    }
    this.mapService.setMarkerSelected($event.source.value, thisMarker.selected);
    this.pathLineHandler();
  }

  meClicker(){
    console.log(this.chipList.selected);
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

  chipSelectionClick($event, clickedMarker: MyMarker){
    console.log("Chip click handler");
    //console.log($event);
    //console.log(clickedMarker);
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
        this.chipDeselectHandler(this.chipList.selected[0]);
        this.chipSelectHandler(chipRef);
      }else{//if not at the selection limit toggle freely
        this.chipSelectHandler(chipRef);
      }
    }
    this.pathLineHandler();
  }

  chipDeselectHandler(chip: MdChip){
    if(chip.value){
      chip.value.selected = false;
    }
    chip.deselect();//triggers call to selectionChange
  }

  chipSelectHandler(chip: MdChip){
    if(chip.value){
      chip.value.selected = true;
    }
    chip.select();//triggers call to selectionChange
  }

  focused(){
    console.log("THINGS FUCUSED");
  }

  markerListAdd(marker: MyMarker){
    this.ref.detectChanges();
  }

  mapInitHandler(map: MyMap){
    this.mapRef = map;
  }

  ngOnInit() {
    this.windowRef.nativeWindow().scrollTo(0, 1300);//TODO Remove

  }

}
