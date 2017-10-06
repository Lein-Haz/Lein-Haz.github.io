import {Component, Inject} from "@angular/core";
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";


@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
})
export class AppDialogComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AppDialogComponent>
  ) {
  }

  confirm(){
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
