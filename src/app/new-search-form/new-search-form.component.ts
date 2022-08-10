import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { SearchTermsService } from '../services/search-terms.service';

@Component({
	selector: 'app-new-search-form',
	templateUrl: './new-search-form.component.html',
	styleUrls: [ './new-search-form.component.css' ]
})
export class NewSearchFormComponent implements OnInit {
	get getTags() {
		return this.searchProductsForm.get('product_tags') as FormArray;
	}

	@Input() filter: boolean;

	brandsChecked: boolean;
	productsChecked: boolean;
	keyWordsChecked: boolean;

	searchProductsForm: FormGroup;
	clearItems = new EventEmitter();


predictiveSearch = {

    newBrandSearchResults: [],
    newProductSearchResults:[],
    newTagSearchResults: []

  }

  brandResults: any[] = [];
  brandSearchResults: any[] = []

  productResults: any[] = []
  productSearchResults: any[] = []

	tagResults: any[] = [];
  tagSearchResults: any[] = []




	options = [ 'benefit', 'colourpop', 'Maybeline' ];

	constructor(private httpService: HttpService, private searchTermsService: SearchTermsService) {}

	ngOnInit(): void {
		this.getSearchResults();
		// this.getTagResults();

		this.searchProductsForm = new FormGroup({
			brandCheckbox: new FormControl(),
			brand: new FormControl(''),
			productCheckbox: new FormControl(),
			product_type: new FormControl(''),
			tagCheckbox: new FormControl(),
			product_tags: new FormArray([
				new FormGroup({
					tag: new FormControl('')
				})
			])
		});
	}

  // get the search results from the service
	getSearchResults(): void {
		this.searchTermsService.getBrands().subscribe((sr) => {
			console.log('brands', sr);
			Object.assign(this.brandResults, sr);
			// same as this.brandResults = sr?
		});
    this.searchTermsService.getProducts().subscribe((sr) => {
			console.log('products', sr);
			Object.assign(this.productResults, sr);

		});
		this.searchTermsService.getTags().subscribe((sr) => {
			console.log('tag', sr);
			Object.assign(this.tagResults, sr);

		});

	}


	searchOnKeyUp(event: any, name: string) {
		let input = event
		console.log('event.target.value: ' + input);
    console.log("name inserted", name)

		if (input.length > 1) {
      if(name ==='brand'){
        console.log("1", name)
        this.brandSearchResults = this.searchFromArray(this.brandResults, input);
      }
      if( name === 'product_type'){
        console.log("2", name)
        this.productSearchResults = this.searchFromArray(this.productResults, input);
      }
      if( name === 'tag'){
        console.log("3", name)
        this.tagSearchResults = this.searchFromArray(this.tagResults, input);
      }
		}
	}
	searchOnKeyUpBrands(event) {
		let input = event.target.value;
		console.log('event.target.value: ' + input);
		console.log('this.brandResults: ' + this.brandResults);
		if (input.length > 1) {
			this.brandSearchResults = this.searchFromArray(this.brandResults, input);
		}
	}
	searchOnKeyUpProducts(event) {
		let input = event.target.value;
		console.log('event.target.value: ' + input);
		console.log('this.productResults: ' + this.productResults);
		if (input.length > 1) {
			this.productSearchResults = this.searchFromArray(this.productResults, input);
		}
	}
	searchOnKeyUpTags(event) {
		let input = event.target.value;
		console.log('event.target.value: ' + input);
		console.log('this.tagResults: ' + this.tagResults);
		if (input.length > 1) {
			this.tagSearchResults = this.searchFromArray(this.tagResults, input);
		}
	}

	searchFromArray(arr, input) {
		let matches = [];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].match(input)) {
				matches.push(arr[i]);
			}
		}
		console.log('matches: ' + matches);
		return matches;
	}

	newTag() {
		return new FormGroup({
			tag: new FormControl('')
		});
	}

	addNewWord() {
		let length = this.getLength();
		if (length < 3) {
			this.getTags.push(this.newTag());
		}
	}

	isChecked(inputType: string) {

    if(inputType === 'brandCheckbox' ){
      this.brandsChecked = !this.searchProductsForm.value.brandCheckbox;
      if (!this.brandsChecked) {
        this.searchProductsForm.get('brand').reset();
      }
    }

    if(inputType === 'productCheckbox'){
      this.productsChecked = !this.searchProductsForm.value.productCheckbox;
      if (!this.productsChecked) {
        this.searchProductsForm.get('product_type').reset();
      }
    }

    if(inputType === 'tagCheckbox'){
      this.keyWordsChecked = !this.searchProductsForm.value.tagCheckbox;
      if (!this.keyWordsChecked) {
        this.searchProductsForm.get('product_tags').reset();
      }
    }

	}

	getLength() {
		let arrayControl = this.searchProductsForm.get('product_tags') as FormArray;
		let length = arrayControl.length;
		return length;
	}

	searchForm() {
		console.log('search Form', this.searchProductsForm.value);
		this.httpService.fetchDataWithParams(this.searchProductsForm.value);
	}

	removeOption(i: number) {
		this.getTags.removeAt(i);
	}
}
