import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-basket',
	templateUrl: './basket.component.html',
	styleUrls: [ './basket.component.css' ]
})
export class BasketComponent implements OnInit {
	// get basketData() {
	//   return this.httpService.immutableBasket;
	// }

	basketData: any;
	amount: number;
	totalItemAmount: number;
	totalItemCost: number;
	showTotals: boolean;

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.getBasket();
	}

	getBasket() {
		this.httpService
			.getBasket()
			.pipe(
				map((responseData) => {
					const itemData = [];
					for (const key in responseData) {
						if (responseData.hasOwnProperty(key)) {
							itemData.push({ ...responseData[key], firebase_id: key });
						}
					}
					return itemData;
				})
			)
			.subscribe((data) => {
				this.basketData = data;
				if (data.length > 0) {
					this.showTotals = true;
				} else {
					this.showTotals = false;
				}
				this.getTotalItemAmount(data);
			});
	}

	changeItemAmount(firebase_id: string, amount: number, changeType: string) {
		if (changeType === 'add') {
			amount++;
		} else {
			amount--;
		}

		if (amount === 0) {
			this.httpService.deleteItem(firebase_id).subscribe(() => {});
		}
		this.httpService.changeAmountViaFireBaseID(firebase_id, amount).subscribe(() => {
			this.getBasket();
		});
	}

	deleteAll(firebase_id: string) {
		this.httpService.deleteItem(firebase_id).subscribe(() => {
			this.basketData = [];
			this.getBasket();
		});
	}

	getTotalItemAmount(data) {
		let amountValues = [];
		let costTotal = [];
		data.forEach((el) => {
			amountValues.push(el.amount);
			let cost = el.amount * el.price;
			costTotal.push(cost);
		});
		this.totalItemAmount = amountValues.reduce((p, c) => p + c, 0);
		this.totalItemCost = costTotal.reduce((p, c) => p + c, 0);

		// let total = parseFloat(costTotal.reduce((p, c) => p + c, 0));
		// this.totalItemCost = Math.round(total * 100) / 100;
	}

	emptyBasket() {
		this.httpService.deleteAll().subscribe(() => {
			this.getBasket();
		});
	}
}

// loop over the basket data and get all the values of the amount key
// use forEach and push the value into an array.
// create an array of these
// then use the reducer method to add them up.
