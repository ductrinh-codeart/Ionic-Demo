import { Component, OnInit } from '@angular/core';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  constructor(private accessService: AccessService) { }

  logoutTimer = this.accessService.logoutTimer.asObservable();
  
  ngOnInit() {
  }

  ionViewDidEnter () {
    this.accessService.resetLogoutTimer();
  }

}
