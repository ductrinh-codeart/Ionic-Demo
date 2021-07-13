import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SharedLoadingService } from '../../../tabs/shared-loading/shared-loading.service';
import { SharedModalPage } from '../../../tabs/shared-modal/shared-modal.page';
import { SharedToastService } from '../../../tabs/shared-toast/shared-toast.service';
import { SharedService } from '../../shared.service';



@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.scss'],
})
export class ShowDepComponent implements OnInit {

  link;
  modalType;
  modalValue;
  DepartmentId;
  DepartmentName;

  //filter
  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];

  constructor(
    private service: SharedService,
    public toast: SharedToastService,
    public modalController: ModalController,
    public loading: SharedLoadingService,
    public route: ActivatedRoute,
  ) {

  }

  DepartmentList: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList() {
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    })
  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function(el){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        modalType: 'add',

        modalConfig: {
          isAddDep: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue = result.data.modalValue;
      this.modalType = result.data.modalType;

      this.DepartmentName = result.data.DepartmentName;
      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
      }
    });
    return await modal.present();
  }

  async presentEditModal(item) {
    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {

        // can pass data into modal here!
        DepartmentId: item.DepartmentId,
        DepartmentName: item.DepartmentName,
        modalType: 'edit',

        modalConfig: {
          isEditDep: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue = result.data.modalValue;
      this.modalType = result.data.modalType;

      this.DepartmentId = result.data.DepartmentId;
      this.DepartmentName = result.data.DepartmentName;
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
    if (this.modalType == 'add') {
      this.toast.ToastInfo = {
        header: 'API Demo:',
        message: 'Cancel Adding New Department!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'API Demo:',
        message: 'Cancel Editing Existing Department!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
  }

  accept() {
    this.loading.presentLoading();
    
    // seperate this between add new or edit existing.
    if (this.modalType == 'add') {
      var val = {
        DepartmentId:     this.DepartmentId,
        DepartmentName:   this.DepartmentName
      };
      this.service.addDepartment(val).subscribe(res => {
        this.refreshDepList();
      })
    }
    else if (this.modalType == 'edit') {
      var val = {
        DepartmentId:     this.DepartmentId,
        DepartmentName:   this.DepartmentName
      };
      this.service.updateDepartment(val).subscribe(res => {
        this.refreshDepList();
      })
    }
  }

  deleteDep(item) {
    if (confirm('Are you sure?')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe(res => {
        this.refreshDepList();

        this.toast.ToastInfo = {
          header: 'API Demo:',
          message: 'Deleted Department!',
          color: 'success',
        }
        this.toast.presentToast();

      })
    }
  }


}
