import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab11PageRoutingModule } from './tab11-routing.module';

import { Tab11Page } from './tab11.page';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab11PageRoutingModule
  ],
  declarations: [
    Tab11Page,
    CuisinesComponent,
    HomeComponent,
    IngredientsComponent,
    RecipesComponent
  ]
})
export class Tab11PageModule {}
