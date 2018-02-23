import { Component, OnInit } from '@angular/core';
import { menuItems } from './left-nav.data';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})

export class LeftNavComponent implements OnInit {
  options: {};
  menuItems = menuItems;

  constructor() { }

  ngOnInit() {
  }

}
