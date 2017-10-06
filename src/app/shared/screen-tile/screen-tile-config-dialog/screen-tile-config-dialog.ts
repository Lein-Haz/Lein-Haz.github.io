import {Component, Inject} from "@angular/core";
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";
import {AppDialogComponent} from "../../app-dialog/app-dialog.component";
import {ScreenTileData} from "../../../../core/models/IScreenTileData.model";


@Component({
  selector: 'screen-tile-config-dialog',
  templateUrl: './screen-tile-config-dialog.html',
})
export class ScreenTileConfigDialog extends AppDialogComponent{

  public tempData: ScreenTileData;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: ScreenTileData,
    public dialogRef: MdDialogRef<AppDialogComponent>
  ) {
    super(data, dialogRef);
    this.tempData = Object.assign({},data);
  }

  makeItSo(){
    this.dialogRef.close(this.data);
  }
}
