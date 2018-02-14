import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  @ViewChild('dashtab') dashTab: MatTabGroup;

  constructor() { }

  ngOnInit() {
    this.dashTab._tabBodyWrapper.nativeElement.className = 'mat-tab-body-wrapper-first mat-tab-body-wrapper';
  }

  tabChanged(e) {
    if (e.index === 0) {
      this.dashTab._tabBodyWrapper.nativeElement.className = 'mat-tab-body-wrapper-first mat-tab-body-wrapper';
    }
    else if (e.index === 5) {
      this.dashTab._tabBodyWrapper.nativeElement.className = 'mat-tab-body-wrapper-last mat-tab-body-wrapper';
    }
    else {
      this.dashTab._tabBodyWrapper.nativeElement.className = 'mat-tab-body-wrapper';
    }
  }

}
