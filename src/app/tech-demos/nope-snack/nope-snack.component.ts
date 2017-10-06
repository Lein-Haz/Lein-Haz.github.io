import {Component, Inject} from "@angular/core";
import {MdSnackBarRef, MD_SNACK_BAR_DATA} from "@angular/material";
@Component({
  selector: 'nope-snack',
  templateUrl: './nope-snack.component.html'
})
export class NopeSnackComponent{
  constructor(
    @Inject(MD_SNACK_BAR_DATA) public data: any,
    public dialogRef: MdSnackBarRef<NopeSnackComponent>
  ){}
}
