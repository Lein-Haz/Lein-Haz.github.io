import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import {MyMap} from "./mapModels/myMap";
import {MyLatLng} from "./mapModels/myLatLng";
import {MyMarker} from "./mapModels/myMarker";
import {StoryService} from "../../../core/services/story.service";

@Component({
  selector: 'home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class HomeMapComponent implements OnInit, AfterViewInit {
  private homeMap: MyMap;

  private markerList: MyMarker[] = [];
  @Input()
  public overLayText: string;

  ngAfterViewInit(): void {

  }

  mapInitHandler($event){
    this.homeMap = $event;
    this.setMapOptions();
    this.addMapClickListener();
  }

  setMapOptions(){
    this.homeMap.setOptions({
      center: {lat: 31.291627, lng: -49.619249},
      zoom: 4
    });
  }

  addMapClickListener(): void{
    this.homeMap.addListener('click', ($event) => {
      let clickedLatLng: MyLatLng = new MyLatLng($event.latLng.lat(), $event.latLng.lng());
      console.log(clickedLatLng);
      console.log(clickedLatLng.toString());
      this.markerList.push(this.storyService.addMarker(clickedLatLng, this.homeMap));

    });
  }

  clearMap(){
    console.log("clear called");
  }

  getBnds(){
    let bnds = this.homeMap.getBounds();
    console.log("Northeast is " + bnds.getNorthEast().toString());
    console.log("Southwest is " + bnds.getSouthWest().toString());
    console.log("Center is " + bnds.getCenter().toString());
    console.log("Zoom is " + this.homeMap.getZoom());
  }

  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.overLayText = "Just initing the overlay text";
  }

}
