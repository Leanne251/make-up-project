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

  // get basket() {
  //   return this.httpService.immutableBasket;
  // }

  get results() {
    return this.httpService.immutableResults;
  }

  get length() {
    return this.httpService.immutableLength;
  }

  fakeData = [
    {
      id: 1,
      name: 'black mascara',
      brand: 'Rimmel',
      api_featured_image: '',
      price: '14.00',
      amount: 1 || 1,
    },
    {
      id: 2,
      name: 'lipstick',
      brand: 'Rimmel',
      api_featured_image: '',
      price: '14.00',
      amount: 1 || 1,
    },
    {
      id: 3,
      name: 'brozner',
      brand: 'Rimmel',
      api_featured_image: '',
      price: '14.00',
      amount: 1 || 1,
    },
  ];

  pages = [];
  itemsPerPage = 25;
  resultsInView = [];
  buttonDisabled = false;
  itemsInBasket = [];
  itemToSend: any;

  ngOnInit(): void {
    this.httpService.results$.subscribe(() => {
      this.cd.markForCheck();
      this.pages = [];
      this.getPages();
      this.getPageResults(1);
    });

    this.getBasket();
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
        this.itemsInBasket = data;
      });
  }

  disableButton(e) {
    e.target.disabled = true;

    setTimeout(() => {
      e.target.disabled = false;
    }, 500);
  }

  addToBasket(e: Event, item) {
    this.disableButton(e);

    this.itemToSend = {
      firebase_id: item.firebase_id,
      id: item.id,
      name: item.name,
      brand: item.brand,
      api_featured_image: item.api_featured_image,
      price: item.price,
      amount: item.amount || 1,
    };

    if (this.itemsInBasket.length === 0) {
      this.addItemToBasket();
    } else {
      this.checkForItem(item);
    }
  }

  addItemToBasket() {
    this.httpService.addNewItemToBasket(this.itemToSend).subscribe(() => {
      this.getBasket();
    });
  }

  checkForItem(item) {
    let found = this.itemsInBasket.find((el) => {
      if (el.id === item.id) {
        return el;
      }
    });

    if (found) {
      if (confirm('Are you sure you want to add this item again')) {
        found.amount++;
        this.httpService
          .changeAmountViaFireBaseID(found.firebase_id, found.amount)
          .subscribe(() => {
            this.getBasket();
          });
      }
    } else {
      this.httpService.addNewItemToBasket(this.itemToSend).subscribe(() => {
        this.getBasket();
      });
    }
  }
}
