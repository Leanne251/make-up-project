import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SearchTermsService {
	constructor(private http: HttpClient) {}

	getBrands() {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.get('./assets/brands.JSON', { headers });
	}

	getProducts() {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.get('./assets/products.JSON', { headers });
	}

	getTags() {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.get('./assets/tags.JSON', { headers });
	}
}
