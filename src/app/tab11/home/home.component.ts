import { Component, OnInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { SharedModalPage } from '../../tabs/shared-modal/shared-modal.page';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  modalType;
  modalValue;

  //Task

  //List 
  CuisineList: any = [];
  CuisineNameList: any = [];
  LevelList: any = [];
  LevelNameList: any = [];
  RecipesList: any = [];
  ImageNamePath: any = [];
  IngredientList: any = [];

  //filter

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

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

      this.loadIngredientList();
    });
  }

  loadIngredientList() {
    this.service.GetAllIngredientName().subscribe((data: any) => {
      this.IngredientList = data;

      this.refreshRecipeList();
    });
  }

  refreshRecipeList() {
    this.service.getRecipeList().subscribe((data: any) => {
      this.RecipesList = data;

      for (let i = 0; i < this.RecipesList.length; i++) {
        this.ImageNamePath.push(this.service.RecipesUrl + data[i].rImageName)
      }
      

      debugger
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


  async presentViewModal(item) {
    debugger

    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        RecipeID:       item.rRecipeID,
        Title:          item.rTitle,
        Description:    item.rDescription,
        ImageName:      item.rImageName,
        ImageNamePath:  this.service.RecipesUrl + item.rImageName,
        CuisineID:      item.rCuisineID,
        PrepTime:       item.rPrepTime,
        CookTime:       item.rCookTime,
        ReadyIn:        item.rReadyIn,
        LevelID:        item.rLevelID,
        Rating:         item.rRating,

        modalType: 'view',
        CuisineList:        this.CuisineList,
        CuisineNameList:    this.CuisineNameList,
        LevelList:          this.LevelList,
        LevelNameList:      this.LevelNameList,
        IngredientList:     this.IngredientList,

        modalConfig: {
          isViewRecipe: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue   =   result.data.modalValue;
      this.modalType    =   result.data.modalType;


      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
      }
    });
    return await modal.present();
  }

  refuse() {
    console.log('refused');
  }

  accept() {
    console.log('accepted');
  }

}
