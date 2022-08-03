import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allSearchResults: any;
  groupsOfTen = []
  items: any


  // if no search results show form.
  // if search results show results.

  constructor() { }

  ngOnInit(): void {
  }

  collectData(searchResults: any){
    this.allSearchResults = searchResults
    this.items = searchResults.slice(0,5)
    console.log(this.items)
  }

}

// with the data, take the first 10 items, to display on a page.
// when you click the next button, you get the next 10 items of the array
