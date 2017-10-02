import {Injectable} from '@angular/core';
import {WindowRef} from "./window.ref";
import {Observable} from "rxjs";

const url = 'https://apis.google.com/js/platform.js?onload=__onGoogleLoaded';

@Injectable()
export class GoogleAuthLoadService {
  loadAPI;

  window: Window;
  constructor(private windowRef: WindowRef){
    this.window = this.windowRef.nativeWindow();
  }

  public load(): Observable<any>{
    //console.log(this.loadAPI);
    if(!this.loadAPI){
      this.loadAPI = new Promise((resolve)=> {
        this.window['__onGoogleLoaded'] = (ev) => {
          resolve(this.window['gapi']);
        };

        this.loadScript();
      });
    }
    //return this.loadAPI;
    return Observable.fromPromise(this.loadAPI);
  }


  private loadScript(){
    console.log("Loading gapi");
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
