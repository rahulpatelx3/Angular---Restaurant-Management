import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) {
   }
   //Post Method
   postRestaurent(data:any){
    return this._http.post<any>("http://localhost:8080/posts",data).pipe(map((res:any)=>{
      return res;
    })) 
  }

  //Get Method
  getRestaurent() {
    return this._http.get<any>("http://localhost:8080/posts").pipe(map((res:any)=>{
      console.log(res);
      return res;
    }))
  }


  //Put Method
  putRestaurent(data:any,id:number){
    return this._http.put<any>("http://localhost:8080/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Delete Method
  deleteRestaurent(id:number){
    return this._http.delete<any>("http://localhost:8080/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
