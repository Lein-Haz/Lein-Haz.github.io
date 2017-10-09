import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import {MyMap} from "./mapModels/myMap";

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mymap') myMap: ElementRef;

  private theMap: MyMap;
  @Input() public showOverLay: boolean = false;
  @Input() private overLayText: string = "Initing the overlay text";

  @Output() mapInitializedEmitter: EventEmitter<MyMap> = new EventEmitter();

  ngAfterViewInit(): void {
    this.mapInit();
  }

  mapInit(){
    let opts = {
      center: {lat: 48.395315, lng: 9.990424},
      zoom: 14
    };

    this.theMap = new MyMap(this.myMap.nativeElement, opts);
    this.mapInitializedEmitter.emit(this.theMap);
  }

  constructor() {}

  ngOnInit() {
  }

}
