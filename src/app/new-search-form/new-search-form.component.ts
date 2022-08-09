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

	brandResults: any[] = [];
	tagResults: any[] = [];
	searchResults: any[] = [];

	options = [ 'benefit', 'colourpop', 'Maybeline' ];

	constructor(private httpService: HttpService, private searchTermsService: SearchTermsService) {}

	ngOnInit(): void {
		this.getBrandResults();
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

	getBrandResults(): void {
		this.searchTermsService.getBrands().subscribe((sr) => {
			console.log('sr', sr);
			Object.assign(this.searchResults, sr);
			// same as this.searchResults = sr?
		});
	}
	// getTagResults(): void {
	// 	this.searchTermsService.getTags().subscribe((sr) => {
	// 		console.log('sr', sr);
	// 		Object.assign(this.searchResults, sr);
	// 		// same as this.searchResults = sr?
	// 	});
	// }

	searchOnKeyUp(event) {
		let input = event.target.value;
		console.log('event.target.value: ' + input);
		console.log('this.searchResults: ' + this.searchResults);
		if (input.length > 1) {
			this.brandResults = this.searchFromArray(this.searchResults, input);
		}
	}

	searchFromArray(arr, regex) {
		let matches = [];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].match(regex)) {
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

	isBrandChecked() {
		this.brandsChecked = !this.searchProductsForm.value.brandCheckbox;
		if (!this.brandsChecked) {
			this.searchProductsForm.get('brand').reset();
		}
	}
	isProductChecked() {
		this.productsChecked = !this.searchProductsForm.value.productCheckbox;
		if (!this.brandsChecked) {
			this.searchProductsForm.get('product_type').reset();
		}
	}

	isTagChecked() {
		this.keyWordsChecked = !this.searchProductsForm.value.tagCheckbox;
		if (!this.brandsChecked) {
			this.searchProductsForm.get('product_tags').reset();
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
		// this.clearItems.emit()
	}

	removeOption(i: number) {
		this.getTags.removeAt(i);
	}
}
