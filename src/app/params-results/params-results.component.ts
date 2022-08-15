import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-params-results',
	templateUrl: './params-results.component.html',
	styleUrls: [ './params-results.component.css' ]
})
export class ParamsResultsComponent implements OnInit {
	constructor(private httpService: HttpService, private cd: ChangeDetectorRef) {}

	get results() {
		return this.httpService.immutableResults;
	}

	get length() {
		return this.httpService.immutableLength;
	}

	pages = [];
	itemsPerPage = 25;
	resultsInView = [];

	ngOnInit(): void {
		this.httpService.results$.subscribe(() => {
			this.cd.markForCheck();
			this.pages = [];
			this.getPages();
			this.getPageResults(1);
		});
	}

	getPages() {
		let number = Math.ceil(this.length / this.itemsPerPage);
		for (let i = 1; i < number + 1; i++) {
			this.pages.push(i);
		}
	}

	getPageResults(page: number) {
		let higherNo = page * this.itemsPerPage;
		let lowerNo = higherNo - this.itemsPerPage;
		this.resultsInView = this.results.slice(lowerNo, higherNo);
		console.log('results', this.resultsInView);
	}

	addToBasket() {
		this.httpService.addToBasket();
	}
}
