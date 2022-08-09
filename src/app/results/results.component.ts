import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit,  } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {




  @Input() item:any
  results: any


  constructor() { }

  ngOnInit(): void {





  // this.httpService.resultData.subscribe(
  //   (data:any) => console.log("results", data)
  // )

  }

}
