import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit {

  modalType;
  modalValue;
  

  
  //Recipe
  
  //List 
  IngredientList: any = [];

  //filter

  constructor(
    private service: RecipesService,
    public toast: SharedToastService,
    public modalController: ModalController,
  ) { 
    
  }

  ngOnInit() {
    this.loadIngredientList();
  }

  loadIngredientList() {
    this.service.GetAllIngredientName().subscribe((data: any) => {
      this.IngredientList = data;

      debugger
    });
  }

}
