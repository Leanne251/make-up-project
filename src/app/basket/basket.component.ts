import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-basket',
	templateUrl: './basket.component.html',
	styleUrls: [ './basket.component.css' ]
})
export class BasketComponent implements OnInit {
	basketData: any;

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.httpService
			.getBasket()
			.pipe(
				map((responseData) => {
					const itemData = [];
					for (const key in responseData) {
						if (responseData.hasOwnProperty(key)) {
							itemData.push({ ...responseData[key], id: key });
						}
					}
					console.log('item', itemData);
					return itemData;
				})
			)
			.subscribe((data) => {
				console.log('data', data);

				this.basketData = data;
			});
	}
}
