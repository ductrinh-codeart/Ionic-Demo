import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {

  modalType;
  modalValue;
  
  
  //Recipe
  
  //List 
  CuisineList: any = [];
  CuisineNameList: any = [];
  LevelList: any = [];
  LevelNameList: any = [];
  RecipesList: any = [];

  //filter


  constructor(
    private service: RecipesService,
    public toast: SharedToastService,
    public modalController: ModalController,
  ) { 
    
  }

  ngOnInit() {
    this.loadCuisineList();
  }

  loadCuisineList() {
    this.service.GetAllCuisineName().subscribe((data: any) => {
      this.CuisineList = data;

      this.loadLevelList();
    });
  }

  loadLevelList() {
    this.service.GetAllLevelName().subscribe((data: any) => {
      this.LevelList = data;

      this.refreshRecipeList();
    });
  }

  refreshRecipeList() {
    this.service.getRecipeList().subscribe((data: any) => {
      this.RecipesList = data;

      this.assignCuisine();
    });
  }

  assignCuisine() {
    for (let i = 0; i < this.RecipesList.length; i++) {
      let c = this.CuisineList.find(o => o.cCuisineID === this.RecipesList[i].rCuisineID);
      this.CuisineNameList.push(c.cCuisine);
    }
    this.assignLevel();
  }

  assignLevel() {
    for (let i = 0; i < this.RecipesList.length; i++) {
      let l = this.LevelList.find(o => o.lLevelID === this.RecipesList[i].rLevelID);
      this.LevelNameList.push(l.lLevelName);
    }
    debugger
  }

  WriteLog(item) {
    console.log('item clicked! Name: ' + item.rTitle)
  }

}
