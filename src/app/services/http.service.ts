import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) {
   }


   getAllProducts(){
  return this.http.get<any>('http://makeup-api.herokuapp.com/api/v1/products.json')
   }


   searchWithParameters(){

   }


   getFormInfo(formInfo){
    // turn form info into params

    console.log(formInfo)

    let params = new HttpParams()



   }
}
