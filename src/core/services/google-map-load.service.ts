import {Injectable} from '@angular/core';
import {WindowRef} from "./window.ref";
import {Observable} from "rxjs";

const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDW2rnsG-2gOOJM5N3V3h261420EuDSrm4&libraries=geometry&callback=__onGMapLoaded';

@Injectable()
export class GoogleMapLoadService {
  loadApi;

  window: Window;
  constructor(private windowRef: WindowRef){
    this.window = this.windowRef.nativeWindow();
  }

  public load(): Observable<any>{
    //console.log(this.loadApi);
    if(!this.loadApi){
      this.loadApi = new Promise((resolve)=> {
        this.window['__onGMapLoaded'] = (ev) => {
          console.debug("Gmap loaded");
          resolve(this.window['google']);
        };

        this.loadScript();
      });
    }
    return Observable.fromPromise(this.loadApi);
  }


  private loadScript(){
    console.log("Loading gmap");
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
