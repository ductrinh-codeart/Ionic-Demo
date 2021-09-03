import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ImportService } from './import.service';
import { Validators, FormBuilder, FormGroup, FormArray, } from '@angular/forms';


@Component({
  selector: 'app-tab12',
  templateUrl: './tab12.page.html',
  styleUrls: ['./tab12.page.scss'],
})
export class Tab12Page implements OnInit {

  segmentView = 's1';


  fileToUpload;
  apiMessage;
  failedData;
  alphabetList;
  public keys;
  chooseProperties;

  isValidated: boolean = false;
  exCommand;

  canSave;
  canNot;

  Test;

  constructor(
    private service: ImportService,
    private loading: LoadingController,
    public formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
  }

  //formBuilder + formValidator
  readGroup = this.formBuilder.group({
    importModel: ['', Validators.required],
  });

  reviewGroup = this.formBuilder.group({
    startRow: ['', Validators.required],
    startCol: ['', Validators.required],
    Properties: this.formBuilder.array([]),
  });

  //formArray ( Mảng Properties làm nhiệm vụ chứa thông tin được map bởi user, giá trị nào ứng với cột nào )
  get Properties() {
    return this.reviewGroup.controls['Properties'] as FormArray;
  }


  //tạo vòng lặp để tạo số lượng thông tin tương ứng.
  //hiện tại đang đọc theo file, dòng đầu tiên, ví dụ có 58 cột thì spawn 58 giá trị, mỗi giá trị tương ứng với từng cell đầu tiên.
  addProperty() {
    this.Properties.clear();
    for (let j = 1; j <= this.chooseProperties.length; j++) {
      const newProperty = this.formBuilder.group({
        property: ['', Validators.required]
      });

      this.Properties.push(newProperty);
    }

    this.buildTable();
  }

  //đảm nhiệm việc render số cột tương ứng trên giao diện của client (Part 1 - TS file).
  buildTable() {
    if (this.apiMessage && this.apiMessage.length > 0) {
      this.keys = Object.keys(this.apiMessage[0]);
    }
  }



  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  readFile() {
    this.isValidated = false;

    if (this.readGroup.invalid) {
      return;
    }

    let formData = new FormData();
    formData.append('FileUpload', this.fileToUpload);

    this.service.UploadFile(formData).subscribe(result => {
      this.apiMessage = result['Item1'];
      this.alphabetList = result['Item2'];
      this.chooseProperties = result['Item3'];
      this.segmentView = 's2';
      this.addProperty();
    });
  }

  importAnyway() {
    console.log('Importing');
    this.exCommand = "import";
    this.validateLoading();
  }

  checkValidate() {

    // Can check value of Properties here ( Properties == giá trị được map với cột nào trong file)
    this.reviewGroup.controls.Properties;
    //debugger;

    if (this.reviewGroup.invalid) {
      return;
    }
    this.exCommand = "validate";
    this.validateLoading();
  }

  downloadExcelFile() {
    console.log('Do something to download')
    let formData = new FormData();


    for ( var key in this.Test ) {
      formData.append(key, this.Test[key]);
    }

    // formData.append('errorData', this.Test);

    this.service.downloadFile().subscribe((data: any)  => 
    
    this.downloadFile(data)),//console.log(data),
                 error => console.log('Error downloading the file.'),
                 () => console.info('OK');
  }

  downloadFile(data: any, fileName?: string) {
    
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);

    fileName = 'Test.xlsx'
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = data.FileDownloadName;
    debugger
    link.click();
    
  }

  downloadURLContent(url) {

    // const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    var pom = document.createElement('a');
    pom.setAttribute('target', '_blank');
    pom.setAttribute('href', url);
    //pom.setAttribute('target', '_blank');
    pom.style.display = 'none';
    document.body.appendChild(pom);
    pom.click();
    debugger
    document.body.removeChild(pom);
}



  //set loading open when validating, and close only when data validated;
  async validateLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Validating Data...',
      spinner: 'circles',
      keyboardClose: true,
    });
    await loading.present();

    let formData = new FormData();
    for (let i = 0; i < this.reviewGroup.value.Properties.length; i++) {
      formData.append('Properties[' + i + ']', this.reviewGroup.value.Properties[i].property);
    }
    formData.append('startRow', this.reviewGroup.value.startRow);
    formData.append('startCol', this.reviewGroup.value.startCol);
    formData.append('fileName', this.fileToUpload.name);
    formData.append('exCommand', this.exCommand);
    formData.append('modelProperty', this.readGroup.value.importModel);

    try {
      this.service.Validating(formData).subscribe(result => {
        this.apiMessage = result['Item3'];
        this.canSave = result['Item4'];
        this.canNot = result['Item5'];
        this.failedData = result['Item6'];
        this.Test = result['Item7'];

        loading.dismiss();
        if ( this.exCommand == "validate" ) {
          console.log(
            'Return read data:',
            // 'Read From Row: ' + result['Item1'],
            // 'Read From Column: ' + result['Item2'],
            // 'Returned Value: ' + result['Item3']
            JSON.stringify(this.apiMessage, null, 2),
            'Start Row: ' + result['Item1'], 'Start Col: ' + result['Item2'], 'Total objects: ' + result['Item3'].length,
          );
        }

        if (this.failedData.length != 0) {
          console.log(
            'Return failed data:',
            JSON.stringify(this.failedData, null, 2)
          );
        }

        if ( this.canSave && this.canNot && this.exCommand == "import") {
          console.log(
            'Save: ' + this.canSave,
            'Can not: ' + this.canNot,
          );
        }

        this.isValidated = true;
        
        if ( this.exCommand == "import" && this.isValidated == true ) {
          this.segmentView = 's3';
        }

      })
    }
    catch (error) {
      loading.dismiss();
      console.log(error);
    }
  }


}