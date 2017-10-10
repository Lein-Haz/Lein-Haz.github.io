import {} from '@types/googlemaps';
import Marker = google.maps.Marker;
import MarkerOptions = google.maps.MarkerOptions;

export class MyMarker extends Marker {

  public id: number;

  constructor(opts?: MarkerOptions, addListener: boolean = false) {
    super(opts);
    //this.addMarkerClickListener();//off until other map work
  }

  private addMarkerClickListener(){
    this.addListener('click', ($event)=>{
      console.log("You clicked the marker");
      console.log($event);
      this.setMap(null);
    })
  }

}
