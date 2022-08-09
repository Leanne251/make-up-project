import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

 @Input() filter:boolean

	brandsChecked: boolean;
  productsChecked: boolean
  keyWordsChecked: boolean;

	searchProductsForm: FormGroup;
  clearItems = new EventEmitter()

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.searchProductsForm = new FormGroup({
      brandCheckbox: new FormControl(),
      brand: new FormControl(""),
      productCheckbox: new FormControl(),
      product_type: new FormControl(""),
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
    // this.clearItems.emit()



  }

  removeOption(i :number){
   this.getTags.removeAt(i)


  }


}
