import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";


@Component({
  selector: 'nav-list',
  templateUrl: './nav-list.component.html'
})
export class NavListComponent implements OnInit {

  public isSignedIn: boolean;

  ngOnInit(): void {

  }

  logout(){
    this.authService.logout();
  }

  constructor(private authService: AuthService){

  }

}
