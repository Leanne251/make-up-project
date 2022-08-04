import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-search-all-products',
	templateUrl: './search-all-products.component.html',
	styleUrls: [ './search-all-products.component.css' ]
})
export class SearchAllProducts implements OnInit {

  //YOU CANT ACTUALLY SEARCH FOR MORE THAN ONE BRAND AT A TIME SO I CAN'T USE A FORM ARRAY!!!!
  //KEPT HERE FOR REFERENCE ON HOW TO SET UP A FORM ARRAY!!


  get getBrands(){
    // return this.searchProductsForm.controls['brands'] as FormArray
    return this.searchProductsForm.get('brands') as FormArray
  }

  filter: false;
	brandsChecked: boolean;
  brandsFields = 0
	searchProductsForm: FormGroup;
  skillsForm: FormGroup;

  @Output() allSearchResults = new EventEmitter<any>()
  // @Output() filters = new EventEmitter<boolean>()

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		// this.searchProductsForm = new FormGroup({
    //   brandCheckbox: new FormControl(),
    //   brands: new FormArray([new FormGroup({
    //     brand: new FormControl(""),
    //   })]),
    //   productType: new FormControl(),
		// 	keyWords: new FormControl(),
		// 	maxBudget: new FormControl()
		// });

  }

  // newBrand(): FormGroup {
  //    return new FormGroup({
  //      brand: new FormControl(""),

  //    })
  // }


//  addNewBrand() {

//   let length = this.getLength();
//   if(length < 3){
//  this.brandsFields++
//  this.getBrands.push(this.newBrand());
//   }
// }

  // onSubmit() {
  //   console.log(this.skillsForm.value);
  // }



  // maybe better getting all the data and saving it in the service.
  // then can call this data and manipulate it to show the products, 10 at a time?

  // maybe use the same subject to "hold" the data and fire to the results
  // then it have depend on if this has data whether or not to show the form?



  searchAllProducts(){
    this.httpService.getAllProducts().subscribe((data:any) =>{
    this.allSearchResults.emit(data)
    })
    }

	// selectFilters() {
	// 	this.filterStatus.emit(!this.filter)
	// }

//  isChecked(){
//   // first check is null, so this is woking opposite to how it should!
//     this.brandsChecked = !this.searchProductsForm.value.brandCheckbox
//     console.log(this.brandsChecked, "tick")
//     console.log(this.searchProductsForm.value.brandCheckbox, )
//  }

//   getLength(){
//     let arrayControl = this.searchProductsForm.get('brands') as FormArray
//     return arrayControl.length
//   }


  // searchForm(){
    // console.log("search Form",this.searchProductsForm.value)
    // this.httpService.getFormInfo(this.searchProductsForm.value.brands)
    // this.httpService.searchWithParameters(this.searchProductsForm.value.brands)
    // this.httpService.resultData.subscribe(
    //   (data:any) => console.log("results data")
    // )

    //send the data from the form to the service
    // the data is used to make a get request
    // then this data is used on the results page.
  // }

  // removeOption(i :number){
  //  this.getBrands.removeAt(i)
  //  this.brandsFields--

  // }


}

//make the add button disabled after 3 boxes added
//
