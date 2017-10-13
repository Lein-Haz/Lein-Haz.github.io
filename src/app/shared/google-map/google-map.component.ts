import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mymap') myMap: ElementRef;

  private theMap: google.maps.Map;
  @Input() public showOverLay: boolean = false;
  @Input() private overLayText: string = "Initing the overlay text";

  @Output() mapInitializedEmitter: EventEmitter<google.maps.Map> = new EventEmitter();

  ngAfterViewInit(): void {
    this.mapInit();
  }

  mapInit(){
    let opts = {
      center: {lat: 48.395315, lng: 9.990424},
      zoom: 14
    };

    this.theMap = new google.maps.Map(this.myMap.nativeElement, opts);
    this.mapInitializedEmitter.emit(this.theMap);
  }

  constructor() {}

  ngOnInit() {
  }

}
