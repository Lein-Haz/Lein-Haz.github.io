import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'media-shade',
  templateUrl: './media-shade.component.html',
  styleUrls: ['./media-shade.component.scss']
})
export class MediaShadeComponent implements OnInit {

  constructor() {}

  public picArray = [];

  @Output() scrollPast: EventEmitter<any> = new EventEmitter();

  scrollDown(){
    this.scrollPast.emit(true);
  }

  ngOnInit() {
    //fit = ['clip','crop']
    let baseStrings = [
        'https://images.unsplash.com/photo-1429794890858-d3016a2bb73c?dpr=1&auto=compress,format&fit=crop&fm=jpg&w=1920',
        'https://images.unsplash.com/photo-1428094479093-8973a318bd76?dpr=1&auto=compress,format&fit=crop&fm=jpg&w=1920',
        'https://images.unsplash.com/photo-1435783099294-283725c37230?dpr=1&auto=compress,format&fit=crop&fm=jpg&w=1920'
    ];

  }

}
