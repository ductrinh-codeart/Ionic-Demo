import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-tab11',
  templateUrl: './tab11.page.html',
  styleUrls: ['./tab11.page.scss'],
})
export class Tab11Page implements OnInit {

  //view
  Home:         boolean = true;
  Recipes:      boolean = false;
  Ingredients:  boolean = false;
  Cuisines:     boolean = false;


  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  closeMenu() {
    this.menu.close('custom');
  }

  toggleHome() {
    this.Home         = true;
    this.Recipes      = false;
    this.Ingredients  = false;
    this.Cuisines     = false;
    this.closeMenu();
  }

  toggleRecipes() { 
    this.Home         = false;
    this.Recipes      = true;
    this.Ingredients  = false;
    this.Cuisines     = false;
    this.closeMenu();
  }

  toggleIngredients() {
    this.Home         = false;
    this.Recipes      = false;
    this.Ingredients  = true;
    this.Cuisines     = false;
    this.closeMenu();
  }

  toggleCuisines() {
    this.Home         = false;
    this.Recipes      = false;
    this.Ingredients  = false;
    this.Cuisines     = true;
    this.closeMenu();
  }



}
