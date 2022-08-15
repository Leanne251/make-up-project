
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {

  constructor(private httpService: HttpService,  private cd: ChangeDetectorRef) { }


  get results(){
    return this.httpService.immutableResults
  }

  get length(){
    return this.httpService.immutableLength
  }




  pages = []
  itemsPerPage= 25;
  resultsInView = []


  ngOnInit(): void {

    this.httpService.results$.subscribe(
      ()=>{
        this.cd.markForCheck();
        this.pages = []
        this.getPages()
        this.getPageResults(1)

      }
    )
    console.log("items", this.itemsPerPage )
  }



  getPages(){
    let number = Math.ceil(this.length / this.itemsPerPage)
    for(let i=1; i < number+1; i++){
      this.pages.push(i)
    }
  }

  getPageResults(page: number){
    let higherNo = page * this.itemsPerPage
    let lowerNo = higherNo - this.itemsPerPage
    this.resultsInView =  this.results.slice(lowerNo, higherNo)
    console.log("results",this.resultsInView)


  }

onChangeItemsDisplayed(event){
  this.itemsPerPage =  event.target.value
  this.pages = []
  this.getPages()
  this.getPageResults(1)

}

}

// select how many items you want on the page.
// default is 25 as pre-set in comp.

// choose a new value, this updates the variable.

// now we need to work out how many pages there will be, if we select X number to display.
// so create a new function?

// so if we have 300 results (.length)
// and we want to display X results.

// we need to do length / results per page.
// so thet getPages function.

// then we need to split the data accordingly, so just call getPage Results 1
