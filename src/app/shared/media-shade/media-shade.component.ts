import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'media-shade',
  templateUrl: './media-shade.component.html',
  styleUrls: ['./media-shade.component.scss']
})
export class MediaShadeComponent implements OnInit {

  constructor() {}

  @Output() scrollPast: EventEmitter<any> = new EventEmitter();

  @Input() public shadeText: string;

  scrollDown(){
    this.scrollPast.emit(true);
  }

  ngOnInit() {

  }

}
