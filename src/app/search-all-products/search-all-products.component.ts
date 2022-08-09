import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-search-all-products',
	templateUrl: './search-all-products.component.html',
	styleUrls: [ './search-all-products.component.css' ]
})
export class SearchAllProducts implements OnInit {

  isLoading=false;

  filter= false;
  @Output() productFilters = new EventEmitter<boolean>()

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {

  }

  searchAllProducts(){
    this.isLoading=true;
    this.httpService.getAllProducts()
    this.httpService.results$.subscribe(()=>{
      this.isLoading = false;
    })
  }

showFilters(){
  this.filter = !this.filter;
   this.productFilters.emit(
    this.filter)
}

}


