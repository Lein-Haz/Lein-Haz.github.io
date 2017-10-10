import {
  Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input,
  ChangeDetectorRef
} from '@angular/core';
import {MyMap} from "./mapModels/myMap";
import {MyLatLng} from "./mapModels/myLatLng";
import {MyMarker} from "./mapModels/myMarker";
import {MapService} from "../../../core/services/map.service";

@Component({
  selector: 'home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class HomeMapComponent implements OnInit, AfterViewInit {
  private homeMap: MyMap;

  @Input() public markerList: MyMarker[] = [];
  @Output() markerListEmit: EventEmitter<MyMarker> = new EventEmitter();
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
      //console.log(clickedLatLng);
      //console.log(clickedLatLng.toString());
      this.addToMarkerList(clickedLatLng);
    });
  }

  private addToMarkerList(markerPosition: MyLatLng){
    let id = MapService.getMarkerCount();
    let newMarker = this.mapService.addMarker(markerPosition, this.homeMap, ++id);
    this.markerList.push(newMarker);
    this.markerListEmit.emit(newMarker);
  }

  clearMap(){
    console.log("clear called");
    console.log(this.markerList);
  }

  getBnds(){
    let bnds = this.homeMap.getBounds();
    console.log("Northeast is " + bnds.getNorthEast().toString());
    console.log("Southwest is " + bnds.getSouthWest().toString());
    console.log("Center is " + bnds.getCenter().toString());
    console.log("Zoom is " + this.homeMap.getZoom());
  }

  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.overLayText = "Just initing the overlay text";
  }

}
