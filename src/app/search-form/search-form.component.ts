import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-search-form',
	templateUrl: './search-form.component.html',
	styleUrls: [ './search-form.component.css' ]
})
export class SearchFormComponent implements OnInit {

  get getBrands(){
    return this.searchProductsForm.controls['brands'] as FormArray
  }


	filters = true;
	brandsChecked: boolean;
  brandsFields = 0
	searchProductsForm: FormGroup;

  @Output() allSearchResults = new EventEmitter<any>()


	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.searchProductsForm = new FormGroup({
      brandCheckbox: new FormControl(),
			brands: new FormArray ([new FormControl()]),
      productType: new FormControl(),
			keyWords: new FormControl(),
			maxBudget: new FormControl()
		});


	}

  // maybe better getting all the data and saving it in the service.
  // then can call this data and manipulate it to show the products, 10 at a time?

  searchAllProducts(){
    this.httpService.getAllProducts().subscribe((data:any) =>{
    this.allSearchResults.emit(data)
    })
    }

	selectFilters() {
		this.filters = !this.filters;
	}

 isChecked(){
  // first check is null, so this is woking opposite to how it should!
    this.brandsChecked = !this.searchProductsForm.value.brandCheckbox
    console.log(this.brandsChecked, "tick")
    console.log(this.searchProductsForm.value.brandCheckbox, )
 }

  getLength(){
    let arrayControl = this.searchProductsForm.get('brands') as FormArray
    const lengthValue = arrayControl.length
    return lengthValue

  }

  addNewBrand() {

     let length = this.getLength();
     if(length < 3){
      (<FormArray>this.searchProductsForm.get('brands')).push(new FormControl(null));
      this.brandsFields++

     }
	}

  searchForm(){
    console.log("search Form",this.searchProductsForm.value)
    this.httpService.getFormInfo(this.searchProductsForm.value.brands)
  }

  removeOption(i :number){
   this.getBrands.removeAt(i)
   this.brandsFields--

  }


}

//make the add button disabled after 3 boxes added
//
