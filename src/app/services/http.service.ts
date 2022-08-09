import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ResultsComponent } from '../results/results.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  get immutableResults(){
    return this.results
  }

  get immutableLength(){
    return this.length
  }

  constructor( private http: HttpClient) {
   }

   private results: any
   private length: any
   params: any

   results$ = new Subject()


   getAllProducts(){
    this.http.get<any>('http://makeup-api.herokuapp.com/api/v1/products.json').subscribe(
     (data: any) =>
       {this.results = data;
        this.length = data.length
        this.results$.next(null)
     }
    )

    }

   fetchDataWithParams(formData: any){
    let params = this.getParams(formData)

    let url = 'http://makeup-api.herokuapp.com/api/v1/products.json'

    if(params){
      this.http.get(url, {params,}).subscribe(
        (data: any) => {
          this.results = data;
          this.length = data.length
          this.results$.next(null)
        })}
   }

   getParams(formData: any){
    this.params = new HttpParams()

    if(formData.brand !== null || ""){
        this.params = this.params.set("brand", formData.brand)
    }

    if(formData.product_type !== null || ""){
      this.params = this.params.set("product_type", formData.product_type)
    }

    if(formData.product_tags.length > 0){
      let productTags = ""
      for (let i =0; i < formData.product_tags.length; i++){
        productTags += `${formData.product_tags[i].tag},`
      }
      let productTagsParams = productTags.slice(0, -1)
      this.params = this.params.set("product_tags", productTagsParams)
    }

    return this.params

   }

   isLoading(){
    this.results$.subscribe(()=>{
      return false;
    })
   }


}
