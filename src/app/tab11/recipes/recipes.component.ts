import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedModalPage } from '../../tabs/shared-modal/shared-modal.page';
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
  RecipeID: number = 0;
  Title;
  Description;
  ImageName;
  CuisineID;
  PrepTime;
  CookTime;
  ReadyIn;
  LevelID;
  Rating;
  IngredientID: any = [];

  
  //List 
  CuisineList: any = [];
  CuisineNameList: any = [];
  LevelList: any = [];
  LevelNameList: any = [];
  RecipesList: any = [];
  ImageNamePath: any = [];
  IngredientList: any = [];

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
    this.CuisineList = [];
    this.service.GetAllCuisineName().subscribe((data: any) => {
      this.CuisineList = data;

      this.loadLevelList();
    });
  }

  loadLevelList() {
    this.LevelList = [];
    this.service.GetAllLevelName().subscribe((data: any) => {
      this.LevelList = data;

      this.loadIngredientList();
    });
  }

  loadIngredientList() {
    this.IngredientList = [];
    this.service.GetAllIngredientName().subscribe((data: any) => {
      this.IngredientList = data;

      this.refreshRecipeList();
    });
  }

  refreshRecipeList() {
    this.RecipesList = [];
    this.ImageNamePath = [];
    this.service.getRecipeList().subscribe((data: any) => {
      this.RecipesList = data;

      for (let i = 0; i < this.RecipesList.length; i++) {
        this.ImageNamePath.push(this.service.RecipesUrl + data[i].rImageName)
      }

      this.assignCuisine();
    });
  }

  assignCuisine() {
    this.CuisineNameList = [];
    for (let i = 0; i < this.RecipesList.length; i++) {
      let c = this.CuisineList.find(o => o.cCuisineID === this.RecipesList[i].rCuisineID);
      this.CuisineNameList.push(c.cCuisine);
    }
    this.assignLevel();
  }

  assignLevel() {
    this.LevelNameList = [];
    for (let i = 0; i < this.RecipesList.length; i++) {
      let l = this.LevelList.find(o => o.lLevelID === this.RecipesList[i].rLevelID);
      this.LevelNameList.push(l.lLevelName);
    }
    
    if ( this.modalType == 'add') {
      this.addRecipeIngredient();
    }
    else if ( this.modalType == 'edit') {
      this.editRecipeIngredient();
    }
  }

  //Add new
  async presentModal() {

    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        modalType: 'add',
        CuisineList:        this.CuisineList,
        CuisineNameList:    this.CuisineNameList,
        LevelList:          this.LevelList,
        LevelNameList:      this.LevelNameList,
        IngredientList:     this.IngredientList,

        modalConfig: {
          isAddRecipe: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue     =   result.data.modalValue;
      this.modalType      =   result.data.modalType;

      this.Title          =   result.data.Title;
      this.Description    =   result.data.Description;
      this.ImageName      =   result.data.ImageName;
      this.CuisineID      =   result.data.CuisineID;
      this.PrepTime       =   result.data.PrepTime;
      this.CookTime       =   result.data.CookTime;
      this.ReadyIn        =   this.PrepTime + this.CookTime;
      this.LevelID        =   result.data.LevelID;
      this.Rating         =   result.data.Rating;
      this.IngredientID   =   result.data.IngredientID;
      
      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
      }
    });
    return await modal.present();
  }

  //View Existing >> Cook ?
  async presentViewModal(item) {

    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        RecipeID:           item.rRecipeID,
        Title:              item.rTitle,
        Description:        item.rDescription,
        ImageName:          item.rImageName,
        ImageNamePath:      this.service.RecipesUrl + item.rImageName,
        CuisineID:          item.rCuisineID,
        PrepTime:           item.rPrepTime,
        CookTime:           item.rCookTime,
        ReadyIn:            item.rReadyIn,
        LevelID:            item.rLevelID,
        Rating:             item.rRating,
        

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

      this.modalValue     =   result.data.modalValue;
      this.modalType      =   result.data.modalType;

      this.RecipeID       =   result.data.RecipeID;
      this.Title          =   result.data.Title;
      this.Description    =   result.data.Description;
      this.ImageName      =   result.data.ImageName;
      this.CuisineID      =   result.data.CuisineID;
      this.PrepTime       =   result.data.PrepTime;
      this.CookTime       =   this.PrepTime + this.CookTime;
      this.ReadyIn        =   result.data.ReadyIn;
      this.LevelID        =   result.data.LevelID;
      this.Rating         =   result.data.Rating;
      this.IngredientID   =   result.data.IngredientID;

      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
        debugger
      }
    });
    return await modal.present();
  }

  //Edit Existing >> Save?
  async presentEditModal(item) {

    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        RecipeID:           item.rRecipeID,
        Title:              item.rTitle,
        Description:        item.rDescription,
        ImageName:          item.rImageName,
        ImageNamePath:      this.service.RecipesUrl + item.rImageName,
        CuisineID:          item.rCuisineID,
        PrepTime:           item.rPrepTime,
        CookTime:           item.rCookTime,
        ReadyIn:            item.rReadyIn,
        LevelID:            item.rLevelID,
        Rating:             item.rRating,

        modalType: 'edit',
        CuisineList:        this.CuisineList,
        CuisineNameList:    this.CuisineNameList,
        LevelList:          this.LevelList,
        LevelNameList:      this.LevelNameList,
        IngredientList:     this.IngredientList,

        modalConfig: {
          isEditRecipe: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue     =   result.data.modalValue;
      this.modalType      =   result.data.modalType;

      this.RecipeID       =   result.data.RecipeID;
      this.Title          =   result.data.Title;
      this.Description    =   result.data.Description;
      this.ImageName      =   result.data.ImageName;
      this.CuisineID      =   result.data.CuisineID;
      this.PrepTime       =   result.data.PrepTime;
      this.CookTime       =   result.data.CookTime;
      this.ReadyIn        =   this.PrepTime + this.CookTime;
      this.LevelID        =   result.data.LevelID;
      this.Rating         =   result.data.Rating;
      this.IngredientID   =   result.data.IngredientID;

      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
        debugger
      }
    });
    return await modal.present();
  }

  refuse() {
    if (this.modalType == 'add') {
      this.toast.ToastInfo = {
        header: 'Recipes:',
        message: 'Cancel Adding New Recipe!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
    else if (this.modalType == 'view')
    {
      this.toast.ToastInfo = {
        header: 'Recipes:',
        message: 'Cancel Cooking Recipe!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Recipes:',
        message: 'Cancel Editing Recipe!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
  }

  accept() {
    // seperate this between add new or edit existing.
    if (this.modalType == 'add') {
      var val = {
        rRecipeID:      this.RecipeID,
        rTitle:         this.Title,
        rDescription:   this.Description,
        rImageName:     this.ImageName,
        rCuisineID:     this.CuisineID,
        rPrepTime:      this.PrepTime,
        rCookTime:      this.CookTime,
        rReadyIn:       this.ReadyIn,
        rLevelID:       this.LevelID,
        rRating:        this.Rating,
      };

      this.service.addRecipe(val).subscribe(res => {
        this.loadCuisineList();
      });
      // console.log(val);
    }
    else if (this.modalType == 'edit') {
      var val = {
        rRecipeID:      this.RecipeID,
        rTitle:         this.Title,
        rDescription:   this.Description,
        rImageName:     this.ImageName,
        rCuisineID:     this.CuisineID,
        rPrepTime:      this.PrepTime,
        rCookTime:      this.CookTime,
        rReadyIn:       this.ReadyIn,
        rLevelID:       this.LevelID,
        rRating:        this.Rating,
      };
      this.service.updateRecipe(val).subscribe(res => {
        this.loadCuisineList();
      });
    }
    this.AddEditComplete();
  }

  AddEditComplete() {
    if (this.modalType == 'add') {
      this.toast.ToastInfo = {
        header: 'Recipes:',
        message: 'Added Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Recipes:',
        message: 'Edited Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
  }

  deleteRecipe(item) {
    if (confirm('Are you sure?')) {
      this.service.deleteRecipe(item.TaskId).subscribe(res => {
        this.loadCuisineList();

        this.toast.ToastInfo = {
          header: 'Recipes:',
          message: 'Deleted Recipe!',
          color: 'success',
        }
        this.toast.presentToast();

      })
    }
  }

  addRecipeIngredient() {
    for (let i = 0; i < this.IngredientID.length; i++) {
      var val2 = {
        riRecipeID:       this.RecipesList[this.RecipesList.length-1].rRecipeID,
        riIngredientID:   this.IngredientID[i],
      };
      this.service.addRecipeIngredient(val2).subscribe(res => {
      });
    };
  }

  editRecipeIngredient() {
    debugger
    for (let i = 0; i < this.IngredientID.length; i++) {
      var val2 = {
        riRecipeID:       this.RecipesList[this.RecipesList.length-1].rRecipeID,
        riIngredientID:   this.IngredientID[i],
      };
      this.service.updateRecipeIngredient(val2).subscribe(res => {
      });
    };
  }

}
