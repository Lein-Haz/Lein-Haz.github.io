import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EnterLeaveAnimation} from "../../../core/animations/enter-leave.animation";

@Component({
  selector: "screen-tile",
  templateUrl: './screen-tile.component.html',
  styleUrls: ['./screen-tile.component.scss'],
  host: {'[@enterLeave]':''},
  animations: EnterLeaveAnimation.animation
})

export class ScreenTileComponent implements OnInit{

  @Input()
  title: string;

  @Output() tileClick: EventEmitter<any> = new EventEmitter();

  constructor(
  ){}

  tileClickHandler(){
    this.tileClick.emit(this.title);
  }

  ngOnInit(): void {

  }
}
