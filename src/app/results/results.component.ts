import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: [ './results.component.css' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {
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
		console.log('items', this.itemsPerPage);
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

	onChangeItemsDisplayed(event) {
		this.itemsPerPage = event.target.value;
		this.pages = [];
		this.getPages();
		this.getPageResults(1);
	}

	addToBasket(item) {
		console.log('item', item);
		this.httpService.addToBasket(item);
	}
}

//what to add
// {id, name, brand, image, desc, price }
