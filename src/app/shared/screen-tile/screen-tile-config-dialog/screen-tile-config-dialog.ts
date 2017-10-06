import {Component, Inject} from "@angular/core";
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";
import {AppDialogComponent} from "../../app-dialog/app-dialog.component";
import {ScreenTileData} from "../../../../core/models/IScreenTileData.model";


@Component({
  selector: 'screen-tile-config-dialog',
  templateUrl: './screen-tile-config-dialog.html',
})
export class ScreenTileConfigDialog extends AppDialogComponent{
  constructor(
    @Inject(MD_DIALOG_DATA) public data: ScreenTileData,
    public dialogRef: MdDialogRef<AppDialogComponent>
  ) {
    super(data, dialogRef);
    console.log("Dia incoming is: ");
    console.log(data);
  }

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
