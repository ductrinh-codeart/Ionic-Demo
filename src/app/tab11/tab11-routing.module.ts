import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';

import { Tab11Page } from './tab11.page';

const routes: Routes = [
  {
    path: '',
    component: Tab11Page
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'ingredients',
    component: IngredientsComponent
  },
  {
    path: 'cuisines',
    component: CuisinesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab11PageRoutingModule {}
