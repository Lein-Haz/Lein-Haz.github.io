import {Injectable} from "@angular/core";
import { Observable } from "rxjs/Rx";


@Injectable()
export class UtilService {

  constructor() {
  }

  public static setStepDelay(delay: number, index:number): Observable<any>{
    //console.log("creating new delay return, with a delay of " + delay + ", for the index " + index);
    return Observable.create((observer)=>{
      setTimeout(()=>{
        //console.log("In the timeout with a delay of " + delay);
        observer.next(index);
        observer.complete();
      }, delay);
    });
  }
}
