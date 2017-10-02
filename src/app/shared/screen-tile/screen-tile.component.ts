import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: "screen-tile",
  templateUrl: './screen-tile.component.html',
  styleUrls: ['./screen-tile.component.scss']
})

export class ScreenTileComponent implements OnInit{

  @Input()
  title: string;

  constructor(
  ){}


  ngOnInit(): void {

  }
}
