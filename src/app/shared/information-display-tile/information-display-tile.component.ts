import {Component, OnInit, Input} from '@angular/core';
import {EnterLeaveAnimation} from "../../../core/animations/enter-leave.animation";

@Component({
  selector: "display-tile",
  templateUrl: './information-display-tile.component.html',
  styleUrls: ['./information-display-tile.component.scss'],
  host: {'[@enterLeave]':''},
  animations: EnterLeaveAnimation.animation
})

export class InformationDisplayTileComponent implements OnInit{

  @Input()
  text: string;

  constructor(
  ){}


  ngOnInit(): void {

  }
}
