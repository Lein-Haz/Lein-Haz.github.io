

export interface IStoryStepModel{
  action: string;
  zoom: number;
  delay: number;//in milliseconds
  text?: string;
  latLng?: google.maps.LatLng;
  path: google.maps.LatLng[];
}
