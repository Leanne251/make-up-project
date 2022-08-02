import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-search-form',
	templateUrl: './search-form.component.html',
	styleUrls: [ './search-form.component.css' ]
})
export class SearchFormComponent implements OnInit {
	filters = true;
	brandsChecked = false;
	searchProductsForm: FormGroup;
	constructor() {}

	ngOnInit(): void {
		this.searchProductsForm = new FormGroup({
			brands: new FormArray([ new FormControl(null) ]),
			productType: new FormControl(),
			keyWords: new FormControl(),
			maxBudget: new FormControl()
		});
	}

	selectFilters() {
		this.filters = !this.filters;
	}

	addNewBrand() {
		(<FormArray>this.searchProductsForm.get('brands')).push(new FormControl(null));
	}
}

//make the add button disabled after 3 boxes added
//
