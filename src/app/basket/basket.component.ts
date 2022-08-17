import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  basketData: any;
  amount: number;

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
      });
  }

  changeItemAmount(firebase_id: string, amount: number, changeType: string) {
    if (changeType === 'add') {
      amount++;
    } else {
      amount--;
    }

    this.httpService.changeAmount(firebase_id, amount).subscribe(() => {
      this.getBasket();
    });
  }

  deleteAll(firebase_id: string) {
    this.httpService.deleteItem(firebase_id).subscribe(() => {
      this.basketData = [];
      this.getBasket();
    });
  }
}
