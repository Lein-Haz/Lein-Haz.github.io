import {Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import {MyMarker} from "../shared/google-map/mapModels/myMarker";
import {MdChipList, MdChip} from "@angular/material";
import {WindowRef} from "../../core/services/window.ref";

@Component({
  selector: 'app-map-stuff',
  templateUrl: './map-stuff.component.html',
  styleUrls: ['./map-stuff.component.scss']
})
export class MapStuffComponent implements OnInit {


  public chipsArray = [];
  public arrayInit: number = 4;
  public markerList: MyMarker[] = [];

  @ViewChild('chipList') chipList: MdChipList;

  constructor(private ref: ChangeDetectorRef, private windowRef: WindowRef) { }

  remove(myMarkerObj, chipReference){
    console.log(chipReference);
    let chip = chipReference as MdChip;
    console.log(myMarkerObj);
    let markerIndex = this.markerList.map((marker)=>{return marker.id}).indexOf(myMarkerObj.id);
    console.log("found at index "+markerIndex);
    let deletedMarker = this.markerList.splice(markerIndex,1);
    deletedMarker[0].setMap(null);
    this.ref.detectChanges();
  }

  selctionChange($event){
   //console.log("Selction change");
   //console.log($event);
  }

  meClicker(){
    console.log(this.chipList.selected);
  }


  toggleSelection($event, clickedMarker: MyMarker){
    console.log("Chip click handler");
    console.log($event);
    console.log(clickedMarker);
    let findId = clickedMarker.id;

    let chipReference = this.chipList.chips.find((chipo, index)=>{
      let markerVal = chipo.value as MyMarker;
      return markerVal.id == findId;
    });
    //console.log(chipReference);
    //console.log(this.chipList.chips);

    //chipReference.select();
    chipReference.toggleSelected();
    this.ref.detectChanges();
  }

  markerListAdd(marker: MyMarker){
    this.ref.detectChanges();
  }

  addChipListListener(){
    /*this.chipList.chipFocusChanges.subscribe(
      (val)=>{
        console.log(val);
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("complete");
      },

    );*/
  }

  ngOnInit() {
    for(let i = 0; i < this.arrayInit; i++){
      this.chipsArray.push(i);
    }
    this.windowRef.nativeWindow().scrollTo(0, 1300);

  }

}
