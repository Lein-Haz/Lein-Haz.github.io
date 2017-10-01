import {Injectable} from '@angular/core';

function _google(): any {
  return google;
}

@Injectable()
export class GoogleRef {
  public nativeGoogle(): any {
    return _google();
  }
}
