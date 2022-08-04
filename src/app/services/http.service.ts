import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  get immutableResultsWithParams(){
    return this.resultsWithParams
  }

  constructor( private http: HttpClient) {
   }

   private resultsWithParams: any;

   resultsWithParams$ = new Subject()


   //subscribe to this in the component where you search all products.
   // data is subscribed to and emitted to home page as output, processed & sent to the "results" section.

   getAllProducts(){
  return this.http.get<any>('http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Organic,Vegan')

   }


   // for this one, the data is subscribed to here.
   // we set the data in an immutable variable and use a getter to change the value.
   // we also call next on the subject.

   // in the component where the information is used we subscribe to the service and mark for checked.
   // we also call a getter which gets the immutable data from the service.



   searchWithParameters(formData: any){

    let brandValues =[]
    for(let i =0; i < formData.length; i++){
      brandValues.push(Object.values(formData[i]))
    }


    let myParams = new HttpParams().set("brand", brandValues[0])
    if(brandValues.length > 1){
      for(let i = 1; i < brandValues.length; i++){
        myParams = myParams.append("brand", brandValues[i])
      }
    }


  const url = 'http://makeup-api.herokuapp.com/api/v1/products.json'

  this.http.get<any>(url,{params: myParams}).subscribe(
    (data:any) => {
      console.log(data.slice(0,5))
    }
  )


    // this.http.get<any>('http://makeup-api.herokuapp.com/api/v1/products.json').subscribe(
    //   (data: any) => {



    //   }
    // )

   }

   // to create parameters we do new httpParams().set("", "")
   // then this.params.append ("","")

   // we need to set the first params, then loop over the next 2 options and append the info.


   getFormInfo(formInfo){
    // turn form info into params

    console.log(formInfo)

    let params = new HttpParams()



   }
}
