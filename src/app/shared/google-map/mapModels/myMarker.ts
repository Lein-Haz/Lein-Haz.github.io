import {} from '@types/googlemaps';
import Marker = google.maps.Marker;
import MarkerOptions = google.maps.MarkerOptions;

export class MyMarker extends Marker {

  constructor(opts?: MarkerOptions) {
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
