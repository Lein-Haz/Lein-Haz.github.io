import {Injectable} from '@angular/core';
import {WindowRef} from "./window.ref";
import {Observable} from "rxjs";

const url = 'https://apis.google.com/js/platform.js?onload=__onGoogleLoaded';

@Injectable()
export class GoogleAuthLoadService {
  loadAPI;

  window: Window;
  constructor(private windowRef: WindowRef){
    console.log("constructor time");
    this.window = this.windowRef.nativeWindow();

    console.log("gonna load");

  }

  public load(): Observable<any>{
    console.log("load called");
    console.log(this.loadAPI);
    if(!this.loadAPI){
      this.loadAPI = new Promise((resolve)=> {
        console.log("loady res");
        this.window['__onGoogleLoaded'] = (ev) => {
          console.log("gapi is in");
          resolve(this.window['gapi']);
        };

        this.loadScript();
      }).then((result)=>{
        console.log("ressie");
        console.log(result);
      });
    }
    //return this.loadAPI;
    return Observable.fromPromise(this.loadAPI);
  }


  private loadScript(){
    console.log("Loading");
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
