import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public testSize: number = 5;
  public anArray = [];
  constructor() { }

  ngOnInit() {
    for(let i = 0; i < this.testSize; i++){
      this.anArray.push(2*i);
    }
    console.log(this.anArray);
  }

  more(){
    let addCount = (this.anArray.length < 2)? 2 : this.anArray.length / 2;
    this.delta(this.anArray.length + addCount);
  }

  less(){
    if(this.anArray.length > 0){

      let removeCount = (this.anArray.length < 3) ? this.anArray.length : 3;
      console.log("Removing this many "+  removeCount);
      this.delta(this.anArray.length - removeCount);
    }

  }

  delta(newSize: number){
    let removeFlag = (newSize < this.anArray.length);
    let changeAmount = (newSize < this.anArray.length) ? this.anArray.length - newSize : newSize - this.anArray.length;
    console.log(changeAmount);

    for (let i = 0; i < changeAmount; i++){
      if(removeFlag){
        this.anArray.pop();

      }else{
        this.anArray.push((this.anArray.length - 1) * 2);

      }
    }
  }

}
