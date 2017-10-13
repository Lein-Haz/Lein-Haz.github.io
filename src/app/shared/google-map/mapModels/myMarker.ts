import {} from '@types/googlemaps';

export interface MyMarker extends google.maps.Marker {
  id: number;
  selected: boolean;
}

export function ClassLoader(){
  return class MyMarker extends google.maps.Marker {
    id: number;
    selected: boolean;

    constructor(opts?: google.maps.MarkerOptions, addListener: boolean = false){
      super(opts);
    }

    private addMarkerClickListener(){
      this.addListener('click', ($event)=>{
        console.log("You clicked the marker");
        console.log($event);
        this.setMap(null);
      });
    }
  }
}
