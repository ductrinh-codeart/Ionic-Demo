import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedModalPage } from '../../tabs/shared-modal/shared-modal.page';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.scss'],
})
export class CuisinesComponent implements OnInit {

  modalType;
  modalValue;
  
  CuisineID: any = 0;
  Title;
  Description;
  ImageName;

  //List 
  CuisineList: any = [];
  ImageNamePath: any = [];

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

      this.ImageNamePath = [];
      for (let i = 0; i < data.length; i++) {
        this.ImageNamePath.push(this.service.CuisineUrl + data[i].cCuisineImage)
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

          CuisineList:     this.CuisineList,
  
          modalConfig: {
            isAddCuisine: true,
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

        CuisineID:          item.cCuisineID,
        Title:              item.cCuisine,
        Description:        item.cCuisineDesc,
        ImageName:          item.cCuisineImage,
        ImageNamePath:      this.service.CuisineUrl + item.cCuisineImage,

        modalType: 'edit',

        CuisineList:     this.CuisineList,

        modalConfig: {
          isEditCuisine: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue     =   result.data.modalValue;
      this.modalType      =   result.data.modalType;

      this.CuisineID      =   result.data.CuisineID;
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
        header: 'Cuisines:',
        message: 'Cancel Adding New Cuisine!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Cuisines:',
        message: 'Cancel Editing Cuisine!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
  }

  accept() {
    // seperate this between add new or edit existing.
    if (this.modalType == 'add') {
      var val = {
        cCuisine:          this.Title,
        cCuisineDesc:      this.Description,
        cCuisineImage:     this.ImageName,
      };

      this.service.addCuisine(val).subscribe(res => {
        this.loadCuisineList();
      });
      // console.log(val);
    }
    else if (this.modalType == 'edit') {
      var val2 = {
        CuisineID:        this.CuisineID,
        cCuisine:          this.Title,
        cCuisineDesc:      this.Description,
        cCuisineImage:     this.ImageName,
      };

      this.service.updateCuisine(val2).subscribe(res => {
        this.loadCuisineList();
      });
      // console.log(val);
    }
    this.AddEditComplete();
  }

  AddEditComplete() {
    if (this.modalType == 'add') {
      this.toast.ToastInfo = {
        header: 'Cuisines:',
        message: 'Added Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Cuisines:',
        message: 'Edited Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
  }

}
