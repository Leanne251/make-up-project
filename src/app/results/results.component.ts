import { isNgTemplate } from '@angular/compiler';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private cd: ChangeDetectorRef
  ) {}

  get basket() {
    return this.httpService.immutableBasket;
  }

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
  itemsInBasket: any;

  ngOnInit(): void {
    this.httpService.results$.subscribe(() => {
      this.cd.markForCheck();
      this.pages = [];
      this.getPages();
      this.getPageResults(1);
    });

    //gets the basket on page load

    this.httpService.getBasket().subscribe((data) => {
      this.itemsInBasket = data;
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
  }

  onChangeItemsDisplayed(event) {
    this.itemsPerPage = event.target.value;
    this.pages = [];
    this.getPages();
    this.getPageResults(1);
  }

  addToBasket(e, item) {
    e.target.disabled = true;

    setTimeout(() => {
      e.target.disabled = false;
    }, 500);

    let itemToSend = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      api_featured_image: item.api_featured_image,
      price: item.price,
      amount: item.amount || 1,
    };

    //if I do a put request, will it make a new

    // need to always be listening for basketUpdate, and set variable to equal whats in the basket.

    this.httpService.getBasket().subscribe((data) => {
      this.itemsInBasket = data;
    });

    if (this.itemsInBasket) {
      if (this.itemsInBasket === undefined) {
        console.log(1);
        this.httpService.addNewItemToBasket(itemToSend);
      } else {
        console.log(2);
        this.itemsInBasket.find((el) => {
          if (el.id === item.id) {
            if (confirm('Are you sure you want to add this item again')) {
              console.log('send patch request');
            } else {
              console.log('cancel');
            }
          } else {
            console.log('add new item');
            this.httpService.addNewItemToBasket(itemToSend);
          }
        });
      }
    }

    // const itemData = [];

    // this.httpService
    //   .getBasket()
    //   .pipe(
    //     map((responseData) => {
    //       for (const key in responseData) {
    //         if (responseData.hasOwnProperty(key)) {
    //           itemData.push({ ...responseData[key], firebase_id: key });
    //         }
    //       }
    //       return itemData;
    //     })
    //   )
    //   .subscribe((data) => {
    //     console.log('data', data);
    //   });

    // if (itemData === []) {

    // }

    //     data.find((el) => {
    //       if (el.id === item.id) {
    //         let duplicate = confirm(
    //           'This item is already in your basket. Would you like to add another one?'
    //         );
    //         if (duplicate === true) {
    //           itemToSend.amount++;
    //           this.httpService.changeAmountViaID(itemToSend);
    //         } else {
    //           return;
    //         }
    //       } else {
    //         console.log('itemToSend', itemToSend);
    //         this.httpService.addToBasket(itemToSend);

    // function setAlert() {
    //   alert('Item Added');
    // }

    // setTimeout(setAlert, 1000);
    //         }
    //       });
    //     });
  }
}

//what to add
// {id, name, brand, image, desc, price }

// Add to basket.
// check if the basket is empty >>> add item to basket with a put request or post request.
// if basket isn't empty, check to see if selected item ID matches an id of that in the basket.
// if match - ask if want to add another item, send a patch request with that id and increase amount + 1

// add to basket... , check contents of basket first.
//

//GETTERS!
//set a variable for items in basket (immutable)
// listen to a subject for when this value changes and update a variable in this comp.

//get items in basket
