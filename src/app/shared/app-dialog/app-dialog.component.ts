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
  ) {}

  theYoshiClick(){
    console.log("Yoshi");
    this.dialogRef.close({
      words: "YOSHI!!!!"
    });
  }

  cancel(){
    console.log("Dia cancelled");
    this.dialogRef.close();
  }
}
