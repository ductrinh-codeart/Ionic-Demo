import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  

  
  //Recipe
  
  //List 
  CuisineList: any = [];

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

      debugger
    });
  }

}
