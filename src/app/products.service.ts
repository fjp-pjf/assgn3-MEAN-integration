import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }
  newProduct(item){
    return this.http.post("http://localhost:3000/insert",{"product":item})
    .subscribe(data=>{console.log(data)})
  }
  editProduct(item,pid){
    return this.http.post("http://localhost:3000/edit",{"product":item,"pid":pid})
    .subscribe(data=>{console.log(data)})
  }
  getSingleProduct(pid:string){
    return this.http.get<any>(`http://localhost:3000/singleProduct/${pid}`);
  }
  deleteProduct(i){
    return this.http.delete<any>(`http://localhost:3000/products/${i}`);
  }
}
