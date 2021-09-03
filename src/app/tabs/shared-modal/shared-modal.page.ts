import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipesService } from '../../tab11/recipes.service';
import { SharedService } from '../../tab9/shared.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.page.html',
  styleUrls: ['./shared-modal.page.scss'],
})
export class SharedModalPage implements OnInit {

  @Input() name: string;
  @Input() sex: string;
  @Input() age: number;
  @Input() phone: any;
  @Input() phones: any;
  @Input() email: any;
  @Input() addresses: any;
  @Input() code: any;
  @Input() color: any;
  @Input() bgcolor: any;

  //Get data pass in for Department ( when Edit )
  @Input() modalType: any;
  @Input() DepartmentId: any;
  @Input() DepartmentName: any;

  //Get data pass in for Employee ( when Edit )
  @Input() DepartmentList: any;
  @Input() EmployeeId: any;
  @Input() EmployeeName: any;
  @Input() Department: any;
  @Input() DateOfJoining: any;
  @Input() PhotoFileName: any;
  @Input() PhotoFilePath: any;

  //Get data pass in for Task ( when Edit )
  @Input() StatusList: any;
  @Input() PriorityList: any;
  @Input() TaskId: any;
  @Input() TaskName: any;
  @Input() Description: any;
  @Input() CreateOn: any;
  @Input() Estimate: any;
  @Input() CompleteOn: any;
  @Input() StatusId: any;
  @Input() PriorityId: any;

  //Get data pass in for Recipe ( when View )
  @Input() CuisineList: any;
  @Input() CuisineNameList: any;
  @Input() LevelList: any;
  @Input() LevelNameList: any;
  @Input() IngredientList: any;
  @Input() RecipeID: any;
  @Input() IngredientID: any;
  @Input() Title: any;
  @Input() ImageName: any;
  @Input() ImageNamePath: any;
  @Input() CuisineID: any;
  @Input() PrepTime: any;
  @Input() CookTime: any;
  @Input() ReadyIn: any;
  @Input() LevelID: any;
  @Input() Rating: any;

  modalConfig = null;
  _modalConfig = {
    isScanner: false,
    scannerPageLabel: 'Scanner Demo',

    isFormInput: false,
    formInputLabel: 'Form Input Demo',

    isAddDep: false,
    AddDepLabel: 'Add Departmant',

    isEditDep: false,
    EditDepLabel: 'Edit Department',

    isAddEmp: false,
    AddEmpLabel: 'Add Employee',

    isEditEmp: false,
    EditEmpLabel: 'Edit Employee',

    isAddTask: false,
    AddTaskLabel: 'Add Task',

    isEditTask: false,
    EditTaskLabel: 'Edit Task',

    isViewRecipe: false,
    ViewRecipeLabel: 'View Recipe',

    isAddRecipe: false,
    AddRecipeLabel: 'Add Recipe',

    isEditRecipe: false,
    EditRecipeLabel: 'Edit Recipe',

    isAddIngredient: false,
    AddIngredientLabel: 'Add Ingredient',

    isEditIngredient: false,
    EditIngredientLabel: 'Edit Ingredient',

    isAddCuisine: false,
    AddCuisineLabel: 'Add Cuisine',

    isEditCuisine: false,
    EditCuisineLabel: 'Add Cuisine',

    isCookMeal: false,
    CookMealLabel: 'Cooking Meal',
  }

  buttonValue;
  CuisineName;
  LevelName;
  IngredientName;
  IngredientsID: any = []
  RecipeIngredientList: any = [];
  SelectedCuisineName;
  SelectedLevelName;
  SelectedIngredientName;

  constructor(
    public modalController: ModalController,
    private tab9service: SharedService,
    private tab11service: RecipesService,
  ) {
  }

  ngOnInit() {
    this.modalConfig = Object.assign(this._modalConfig, this.modalConfig);


    if (this._modalConfig.isEditRecipe == true || this._modalConfig.isViewRecipe == true) {
      this.loadRecipeIngreList();
    }
    else {
      this.assignRecipes();
    }
  }

  loadRecipeIngreList() {
    var val = this.RecipeID;

    this.tab11service.GetRecipeIngredients(val).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        let ri = this.IngredientList.find(o => o.iIngredientID === res[i].riIngredientID);
        this.RecipeIngredientList.push(ri.iIngredient)
      };
      this.assignRecipes();
    });
  }

  async assignRecipes() {
    
    if (this._modalConfig.isViewRecipe == true) {
      let c = this.CuisineList.find(o => o.cCuisineID === this.CuisineID);
      this.CuisineName = c.cCuisine;

      let l = this.LevelList.find(o => o.lLevelID === this.LevelID);
      this.LevelName = l.lLevelName;

    }

    else if (this._modalConfig.isAddRecipe == true) {

      this.CuisineName = this.CuisineList;
      this.LevelName = this.LevelList;
      this.IngredientName = this.IngredientList;

    }

    else if ( this._modalConfig.isEditRecipe == true ) {

      this.CuisineName = this.CuisineList;
      this.LevelName = this.LevelList;
      this.IngredientName = this.IngredientList;

      let c = this.CuisineList.find(o => o.cCuisineID === this.CuisineID);
      this.SelectedCuisineName = c.cCuisine;

      let l = this.LevelList.find(o => o.lLevelID === this.LevelID);
      this.SelectedLevelName = l.lLevelName;

      this.SelectedIngredientName = this.RecipeIngredientList;
    }
  }

  uploadPhoto(event) {
    debugger
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    if (this._modalConfig.isAddEmp == true || this._modalConfig.isEditEmp == true) {
      this.tab9service.UploadPhoto(formData).subscribe((data: any) => {
        this.PhotoFileName = data.toString();
        this.PhotoFilePath = (this.tab9service.PhotoUrl + this.PhotoFileName).toString();
      });
    }
    else if (this._modalConfig.isAddRecipe == true || this._modalConfig.isEditRecipe == true) {
      this.tab11service.UploadRecipeImage(formData).subscribe((data: any) => {
        this.ImageName = data.toString();
        this.ImageNamePath = (this.tab11service.RecipesUrl + this.ImageName).toString();
        debugger
      });
    }

    else if (this._modalConfig.isAddIngredient == true || this._modalConfig.isEditIngredient == true) {
      this.tab11service.UploadIngredientImage(formData).subscribe((data: any) => {
        this.ImageName = data.toString();
        this.ImageNamePath = (this.tab11service.IngredientsUrl + this.ImageName).toString();
        debugger
      });
    }
  }

  refuse() {
    this.buttonValue = 'refuse';
    this.dismiss();
  }

  accept() {
    this.buttonValue = 'accept';
    this.dismiss();
  }


  changeCuisine(ev: any) {
    let c = this.CuisineList.find(o => o.cCuisine === this.SelectedCuisineName);
    this.CuisineID = c.cCuisineID;

    debugger
  }

  changeLevel(ev: any) {
    let l = this.LevelList.find(o => o.lLevelName === this.SelectedLevelName);
    this.LevelID = l.lLevelID;

    debugger
  }

  changeIngredient(ev: any) {
    for (let i = 0; i < this.SelectedIngredientName.length; i++) {

      let ig = this.IngredientList.find(o => o.iIngredient === this.SelectedIngredientName[i]);

      this.IngredientsID.push(ig.iIngredientID);
    }
    debugger
  }


  //fix this! Seperate out!
  dismiss() {

    if (this._modalConfig.isAddDep == true || this._modalConfig.isEditDep == true) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,

        DepartmentId:     this.DepartmentId,
        DepartmentName:   this.DepartmentName,
      });
    }

    else if (this._modalConfig.isAddEmp == true || this._modalConfig.isEditEmp == true) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,

        EmployeeId:       this.EmployeeId,
        EmployeeName:     this.EmployeeName,
        Department:       this.Department,
        DateOfJoining:    this.DateOfJoining,
        PhotoFileName:    this.PhotoFileName,
      });
    }

    else if ((this._modalConfig.isAddTask == true || this._modalConfig.isEditTask == true)) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,

        TaskId:           this.TaskId,
        TaskName:         this.TaskName,
        Description:      this.Description,
        CreateOn:         this.CreateOn,
        Estimate:         this.Estimate,
        CompleteOn:       this.CompleteOn,
        StatusId:         this.StatusId,
        PriorityId:       this.PriorityId,
      });
    }

    else if ( this._modalConfig.isAddRecipe == true || this._modalConfig.isEditRecipe == true ) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,

        RecipeID:         this.RecipeID,
        Title:            this.Title,
        Description:      this.Description,
        ImageName:        this.ImageName,
        CuisineID:        this.CuisineID,
        PrepTime:         this.PrepTime,
        CookTime:         this.CookTime,
        ReadyIn:          this.ReadyIn,
        LevelID:          this.LevelID,
        Rating:           this.Rating,
        IngredientID:     this.IngredientsID,
      });
    }

    else if ( this._modalConfig.isViewRecipe == true ) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,

        RecipeID:         this.RecipeID,
        Title:            this.Title,
        Description:      this.Description,
        ImageName:        this.ImageName,
        CuisineID:        this.CuisineID,
        PrepTime:         this.PrepTime,
        CookTime:         this.CookTime,
        ReadyIn:          this.ReadyIn,
        LevelID:          this.LevelID,
        Rating:           this.Rating,
        IngredientID:     this.IngredientsID,
      });
    }

    else if ( this._modalConfig.isAddIngredient == true || this._modalConfig.isEditIngredient == true ) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,

        IngredientID:     this.IngredientID,
        Title:            this.Title,
        Description:      this.Description,
        ImageName:        this.ImageName,
      });
    }

    else if ( this._modalConfig.isAddCuisine == true || this._modalConfig.isEditCuisine == true ) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,

        CuisineID:        this.CuisineID,
        Title:            this.Title,
        Description:      this.Description,
        ImageName:        this.ImageName,
      });
    }

    else if ( this._modalConfig.isCookMeal == true) {
      this.modalController.dismiss({
        modalValue:       this.buttonValue,
        modalType:        this.modalType,
      });
    }
  }
}
