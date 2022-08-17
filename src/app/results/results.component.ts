import { isNgTemplate } from '@angular/compiler';
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
  buttonDisabled = false;

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

	addToBasket(e, item) {
    e.target.disabled = true;


    setTimeout(()=>{
      e.target.disabled = false;
    },500)


    let itemToSend= {
      id: item.id,
      name: item.name,
      brand: item.brand,
      api_featured_image: item.api_featured_image,
      price: item.price,
      amount: 1

    }

		console.log('itemToSend', itemToSend);
		this.httpService.addToBasket(itemToSend);
	}
}

//what to add
// {id, name, brand, image, desc, price }

// can i check on "add to basket" if the 'id' is already in the basket.
// Then have a pop up to say - are you sure you want to add item again.
// if click yes, increase amount by 1?

//send object to basket {

