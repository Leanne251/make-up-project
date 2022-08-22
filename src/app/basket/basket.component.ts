import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  // get basketData() {
  //   return this.httpService.immutableBasket;
  // }

  basketData: any;
  amount: number;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getBasket();

    this.getTotalAmounts();
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
        console.log('basket', this.basketData);
      });
  }

  changeItemAmount(firebase_id: string, amount: number, changeType: string) {
    if (changeType === 'add') {
      amount++;
    } else {
      amount--;
    }

    this.httpService
      .changeAmountViaFireBaseID(firebase_id, amount)
      .subscribe(() => {
        this.getBasket();
      });
  }

  deleteAll(firebase_id: string) {
    this.httpService.deleteItem(firebase_id).subscribe(() => {
      this.basketData = [];
      this.getBasket();
    });
  }

  getTotalAmounts() {
    if (this.basketData) {
      console.log(1);
      let amountValues = [];
      this.basketData.forEach((el) => {
        console.log(el.amount);
        amountValues.push(el.amount);
      });

      console.log(amountValues, 'amount V');
      amountValues.reduce((p, c) => p + c, 0);
      console.log(amountValues, 'amount V');
    }
  }
}

// loop over the basket data and get all the values of the amount key
// use forEach and push the value into an array.
// create an array of these
// then use the reducer method to add them up.
