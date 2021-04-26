import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  componenttitle: Array <string> = []
  names: Array <string> = [];
  constructor() {

    this.componenttitle = [
      'action sheet' ,
      'alert' ,
      'avatar' ,
      'badge' ,
      'button' ,
      'card' ,
      'checkbox' ,
      'chip' ,
      'content' ,
      'date & time picker' ,
      'floating action button' ,
      'grid' ,
      'icons' ,
      'infinite scroll' ,
      'input' ,
      'item' ,
      'item group' ,
      'list' ,
      'loading' ,
      'menu' ,
      'modal' ,
      'navigation' ,
      'note' ,
      'picker' ,
      'popover' ,
      'progress bar' ,
      'radio' ,
      'range' ,
      'refresher' ,
      'reorder' ,
      'searchbar' ,
      'segment' ,
      'select' ,
      'skeleton text' ,
      'spinner' ,
      'slides' ,
      'tabsview' ,
      'text' ,
      'thumbnail' ,
      'toast' ,
      'toggle' ,
      'toolbar' 
    ]
  }

}
