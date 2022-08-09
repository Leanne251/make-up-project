import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-params-results',
  templateUrl: './params-results.component.html',
  styleUrls: ['./params-results.component.css']
})
export class ParamsResultsComponent implements OnInit {



  constructor(private httpService: HttpService,  private cd: ChangeDetectorRef) { }

  // get getResultsWithParams(){
  //   console.log("resultsWithParams", this.httpService.immutableResultsWithParams)
  //   return this.httpService.immutableResultsWithParams
  // }

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
        this.getPages()
        this.getPageResults(1)
      }
    )

  }



  getPages(){
    console.log(this.length/this.itemsPerPage, "length")
    let number = Math.ceil(this.length / this.itemsPerPage)
    console.log(number, "number")
    for(let i=1; i < number+1; i++){
      this.pages.push(i)
    }
    console.log("array", this.pages)
  }

  getPageResults(page: number){
    let higherNo = page * this.itemsPerPage
    let lowerNo = higherNo - this.itemsPerPage
    this.resultsInView =  this.results.slice(lowerNo, higherNo)
    console.log("results",this.resultsInView)

  }

}

// click on the number, and get the results for that page.
// so it will be results array.split(lowernumber, highernumber)
// let higherNo = page
// let lower number = page - itemsPerPage

//when you click search you get the first lot of items per page, so you call the function, get page results with 1.
//

//click search >>> got to http >>> get results >>> store in variable >>> called in comp >> maybe oninit?

