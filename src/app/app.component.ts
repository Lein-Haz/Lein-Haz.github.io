import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public isSignedIn: boolean;


  ngOnInit(): void {

  }

  title = 'app';

  constructor(){

  }
}
