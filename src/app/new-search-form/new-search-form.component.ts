import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-new-search-form',
  templateUrl: './new-search-form.component.html',
  styleUrls: ['./new-search-form.component.css']
})
export class NewSearchFormComponent implements OnInit {

get getTags(){
  return this.searchProductsForm.get('product_tags') as FormArray
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
      product_type: new FormControl(),
      tagCheckbox: new FormControl(),
			product_tags: new FormArray ([new FormGroup({
            tag: new FormControl(""),
          })])

        })

  }

  newTag(){
    return new FormGroup ({
      tag: new FormControl("")
    })
  }

 addNewWord() {
let length = this.getLength();
if(length < 3){

 this.getTags.push(this.newTag());
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
    if(!this.brandsChecked){
        this.searchProductsForm.get('brand').reset()
    }
 }
 isProductChecked(){
    this.productsChecked = !this.searchProductsForm.value.productCheckbox
    if(!this.brandsChecked){
      this.searchProductsForm.get('product_type').reset()
  }

 }

 isTagChecked(){
    this.keyWordsChecked = !this.searchProductsForm.value.tagCheckbox
    if(!this.brandsChecked){
      this.searchProductsForm.get('product_tags').reset()
  }

 }

  getLength(){
    let arrayControl = this.searchProductsForm.get('product_tags') as FormArray
let length =  arrayControl.length

return length;
  }


  searchForm(){
    console.log("search Form",this.searchProductsForm.value)
    this.httpService.fetchDataWithParams(this.searchProductsForm.value)

    // this.httpService.getFormInfo(this.searchProductsForm.value.brands)
    // this.httpService.searchWithParameters(this.searchProductsForm.value.brands)
    // this.httpService.resultData.subscribe(
    //   (data:any) => console.log("results data")
    // )

    // send the data from the form to the service
    // the data is added to a private variable, this triggers a getter and nudges a subject.
    // then in the results page, we will subscribe to the subject & create a getter to get the data.

  }

  removeOption(i :number){
   this.getTags.removeAt(i)


  }


}
