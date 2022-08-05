import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit,  } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {


  get getResultsWithParams(){
    return this.httpService.immutableResultsWithParams
  }

  @Input() item:any
  results: any


  constructor(private httpService: HttpService,  private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.httpService.resultsWithParams$.subscribe(
      ()=>{
        this.cd.markForCheck();

      }
    )

    console.log("get", this.getResultsWithParams)

    this.results = this.getResultsWithParams

    console.log("r", this.results)

  // this.httpService.resultData.subscribe(
  //   (data:any) => console.log("results", data)
  // )

  }

}
