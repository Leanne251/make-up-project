import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-new-search-form',
  templateUrl: './new-search-form.component.html',
  styleUrls: ['./new-search-form.component.css']
})
export class NewSearchFormComponent implements OnInit {

get getKeyWords(){
  return this.searchProductsForm.get('keyWords') as FormArray
}

 @Input() filters: number;

	brandsChecked: boolean;
  productsChecked: boolean
  keyWordsChecked: boolean;

	searchProductsForm: FormGroup;

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.searchProductsForm = new FormGroup({
      brandCheckbox: new FormControl(),
      brand: new FormControl(""),
      productCheckbox: new FormControl(),
      productType: new FormControl(),
      wordCheckbox: new FormControl(),
			keyWords: new FormArray ([new FormGroup({
            keyWord: new FormControl(""),
          })])

        })

  }

  newWord(){
    return new FormGroup ({
      keyWord: new FormControl("")
    })
  }

 addNewWord() {
let length = this.getLength();
if(length < 3){

 this.getKeyWords.push(this.newWord());
  }
}

  // onSubmit() {
  //   console.log(this.skillsForm.value);
  // }



  // maybe better getting all the data and saving it in the service.
  // then can call this data and manipulate it to show the products, 10 at a time?

  // maybe use the same subject to "hold" the data and fire to the results
  // then it have depend on if this has data whether or not to show the form?


 isBrandChecked(){
    this.brandsChecked = !this.searchProductsForm.value.brandCheckbox

 }
 isProductChecked(){
    this.productsChecked = !this.searchProductsForm.value.productCheckbox

 }
 isKeyWordChecked(){
    this.keyWordsChecked = !this.searchProductsForm.value.wordCheckbox

 }

  getLength(){
    let arrayControl = this.searchProductsForm.get('keyWords') as FormArray
let length =  arrayControl.length

return length;
  }


  searchForm(){
    console.log("search Form",this.searchProductsForm.value)
    // this.httpService.getFormInfo(this.searchProductsForm.value.brands)
    // this.httpService.searchWithParameters(this.searchProductsForm.value.brands)
    // this.httpService.resultData.subscribe(
    //   (data:any) => console.log("results data")
    // )

    // send the data from the form to the service
    // the data is used to make a get request
    // then this data is used on the results page.
  }

  removeOption(i :number){
   this.getKeyWords.removeAt(i)


  }


}
