import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'media-shade',
  templateUrl: './media-shade.component.html',
  styleUrls: ['./media-shade.component.scss']
})
export class MediaShadeComponent implements OnInit {

  constructor() {}

  @Output() scrollPast: EventEmitter<any> = new EventEmitter();

  scrollDown(){
    this.scrollPast.emit(true);
  }

  ngOnInit() {

  }

}
