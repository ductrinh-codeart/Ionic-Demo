import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedModalPage } from '../../tabs/shared-modal/shared-modal.page';
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
  IngredientID: any = 0;
  Title;
  Description;
  ImageName;

  //Recipe
  
  //List 
  IngredientList: any = [];
  ImageNamePath: any = [];

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

      this.ImageNamePath = [];
      for (let i = 0; i < data.length; i++) {
        this.ImageNamePath.push(this.service.IngredientsUrl + data[i].iIngredientImage)
      }

      debugger
    });
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

          IngredientList:     this.IngredientList,
  
          modalConfig: {
            isAddIngredient: true,
          }
        },
      });
  
      modal.onDidDismiss().then((result: any) => {
  
        this.modalValue     =   result.data.modalValue;
        this.modalType      =   result.data.modalType;
        
        this.Title          =   result.data.Title;
        this.Description    =   result.data.Description;
        this.ImageName      =   result.data.ImageName;

        if (this.modalValue == 'refuse') {
          this.refuse();
        }
        else {
          this.accept();
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

        IngredientID:       item.iIngredientID,
        Title:              item.iIngredient,
        Description:        item.iIngredientDesc,
        ImageName:          item.iIngredientImage,
        ImageNamePath:      this.service.IngredientsUrl + item.iIngredientImage,

        modalType: 'edit',

        IngredientList:     this.IngredientList,

        modalConfig: {
          isEditIngredient: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue     =   result.data.modalValue;
      this.modalType      =   result.data.modalType;

      this.IngredientID   =   result.data.IngredientID;
      this.Title          =   result.data.Title;
      this.Description    =   result.data.Description;
      this.ImageName      =   result.data.ImageName;

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
        header: 'Ingredients:',
        message: 'Cancel Adding New Ingredient!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Ingredients:',
        message: 'Cancel Editing Ingredient!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
  }

  accept() {
    // seperate this between add new or edit existing.
    if (this.modalType == 'add') {
      var val = {
        iIngredient:          this.Title,
        iIngredientDesc:      this.Description,
        iIngredientImage:     this.ImageName,
      };

      this.service.addIngredient(val).subscribe(res => {
        this.loadIngredientList();
      });
      // console.log(val);
    }
    else if (this.modalType == 'edit') {
      var val2 = {
        iIngredientID:        this.IngredientID,
        iIngredient:          this.Title,
        iIngredientDesc:      this.Description,
        iIngredientImage:     this.ImageName,
      };

      this.service.updateIngredient(val2).subscribe(res => {
        this.loadIngredientList();
      });
      // console.log(val);
    }
    this.AddEditComplete();
  }

  AddEditComplete() {
    if (this.modalType == 'add') {
      this.toast.ToastInfo = {
        header: 'Ingredients:',
        message: 'Added Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Ingredients:',
        message: 'Edited Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
  }

}
