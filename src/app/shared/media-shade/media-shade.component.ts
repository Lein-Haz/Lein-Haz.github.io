import {Component, OnInit, Input} from '@angular/core';
import {WindowRef} from "../../../core/services/window.ref";

@Component({
  selector: 'media-shade',
  templateUrl: './media-shade.component.html',
  styleUrls: ['./media-shade.component.scss']
})
export class MediaShadeComponent implements OnInit {

  constructor(private windowRef: WindowRef) {
    this.window = this.windowRef.nativeWindow();
  }

  private window: Window;
  @Input()
  public toolbarHeight: number;


  goDown(){
    console.log("clicked scroll");
    this.windowRef.animatedScroll(0, this.window.innerHeight - this.toolbarHeight);
  }

  ngOnInit() {


  }

}
