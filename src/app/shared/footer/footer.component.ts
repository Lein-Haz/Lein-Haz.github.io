import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ConstantService} from "../../../core/services/constant.service";
import {WindowRef} from "../../../core/services/window.ref";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() navToggle: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {

  }
}
