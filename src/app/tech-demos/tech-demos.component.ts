import { Component, OnInit } from '@angular/core';
import {isUndefined} from "util";
import {Observable} from "rxjs";
import {StoryService} from "../../core/services/story.service";
import {MdDialog, MdSnackBar} from "@angular/material";
import {ScreenTileData} from "../../core/models/IScreenTileData.model";
import {ScreenTileConfigDialog} from "../shared/screen-tile/screen-tile-config-dialog/screen-tile-config-dialog";
import {NopeSnackComponent} from "./nope-snack/nope-snack.component";

@Component({
  selector: 'app-tech-demos',
  templateUrl: './tech-demos.component.html',
  styleUrls: ['./tech-demos.component.scss']
})
export class TechDemosComponent implements OnInit {

  public tileArrayInitSize: number = 5;
  public screenTileArray: ScreenTileData[] = [];
  public tileArray = [];
  public selectedArray = [];//not using yet

  constructor(
    private storyService: StoryService,
    private dialog: MdDialog,
    private nopeSnack: MdSnackBar
  ) { }

  ngOnInit() {
    for(let i = 0; i < this.tileArrayInitSize; i++){//init some tiles
      this.tileArray.push(2*i);
      this.screenTileArray.push(this.newTile(i));
    }
  }

  newTile(value: number): ScreenTileData{
    let val = value + 1;
    return {
      id: value.toString(),
      title: val.toString(),
      selectionLocked: false
    }
  }

  tileConfigClickHandler(tileData: ScreenTileData){
    let diaRef = this.dialog.open(ScreenTileConfigDialog, {
      data: tileData
    });
    diaRef.afterClosed().subscribe(
      (results)=>{

      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("This probably doesn't happen");//it actually does
      }
    );
  }

  tileClickHandler(tileData: ScreenTileData){
    if(!tileData.selectionLocked){
      this.selectionChangeHandler(tileData);
    }else{
      this.nopeSnack.openFromComponent(NopeSnackComponent,{
        duration: 200,
        data: {
          message: 'Nope'
        }
      });
    }
  }

  selectionChangeHandler(tileData: ScreenTileData){
    tileData.selected = !tileData.selected;
    if(tileData.selected){
      this.selectedArray.push(tileData);
    }else{
      let tileAtIndex = this.selectedArray.findIndex((selectedTile):boolean=>{
        return (selectedTile.id === tileData.id);
      });
      if(tileAtIndex >= 0){
        this.selectedArray.splice(tileAtIndex, 1);
      }
    }
  }

  moreTiles(){
    let addCount = (this.screenTileArray.length < 2)? 2 : this.screenTileArray.length / 2;
    this.delta(this.screenTileArray.length + addCount);
  }

  fewerTiles(){
    if(this.screenTileArray.length > 0){
      let removeCount = (this.screenTileArray.length < 3) ? this.screenTileArray.length : 3;
      this.delta(this.screenTileArray.length - removeCount);
    }
  }

  delta(newSize: number){
    let removeFlag = (newSize < this.screenTileArray.length);
    let changeAmount = (newSize < this.screenTileArray.length) ? this.screenTileArray.length - newSize : newSize - this.screenTileArray.length;
    let animationObservable: Observable<any>;

    for (let i = 0; i < changeAmount; i++){
      let position = this.screenTileArray.length + (i * ((removeFlag)? -1: 1));
      position = (removeFlag) ? position - 1 : position;
      if(isUndefined(animationObservable)){
        animationObservable = this.storyService.setStepDelay(150, position);
      }else{
        animationObservable = animationObservable.concat(this.storyService.setStepDelay(150, position));
      }
    }
    animationObservable.subscribe(
      (indexSpot)=> {
        if(removeFlag){
          this.screenTileArray.splice(indexSpot);

        }else{
          this.screenTileArray.push(this.newTile(this.screenTileArray.length));
        }
      },
      (err)=> {
        console.log("Error happened");
        console.log(err);
      },
      ()=> {

      }
    );
  }

}
