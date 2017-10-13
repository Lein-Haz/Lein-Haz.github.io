import {Component, OnInit, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import {MyMarker} from "./mapModels/myMarker";
import {MapService} from "../../../core/services/map.service";

@Component({
  selector: 'home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class HomeMapComponent implements OnInit, AfterViewInit {
  private homeMap: google.maps.Map;

  @Input() public markerList: MyMarker[] = [];
  @Output() markerListEmit: EventEmitter<MyMarker> = new EventEmitter();
  @Output() mapInitEmitter: EventEmitter<google.maps.Map> = new EventEmitter();
  @Input() public overLayText: string;

  ngAfterViewInit(): void {

  }

  mapInitHandler($event){
    this.homeMap = $event;
    this.setMapOptions();
    this.addMapClickListener();
    this.mapInitEmitter.emit(this.homeMap);
  }

  setMapOptions(){
    this.homeMap.setOptions({
      center: {lat: 31.291627, lng: -49.619249},
      zoom: 4
    });
  }

  addMapClickListener(): void{
    this.homeMap.addListener('click', ($event) => {
      let clickedLatLng: google.maps.LatLng = new google.maps.LatLng($event.latLng.lat(), $event.latLng.lng());
      //console.log(clickedLatLng);
      //console.log(clickedLatLng.toString());
      this.addToMarkerList(clickedLatLng);
    });
  }

  private addToMarkerList(markerPosition: google.maps.LatLng){
    let id = MapService.getMarkerCount();
    let newMarker = this.mapService.addMarker(markerPosition, this.homeMap, ++id);
    this.markerList.push(newMarker);
    this.markerListEmit.emit(newMarker);
  }

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.overLayText = "Just initing the overlay text";
  }

}
