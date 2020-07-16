import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  title:String = "Product List";
  //product is the model class for product item
  //products: ProductModel[];
  products:any;
  //image properties
  imageWidth:number = 50;
  imageMargin:number = 2;

  showImage:boolean = false;
  //creating service object for calling get products()
  constructor(private productService:ProductsService,private router:Router) { }
  //productItem = new ProductModel(null,null,null,null,null,null,null,null);

  
  toggleImage():void{
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    //calling getproducts() and loading the products to the productsarray
    this.productService.getProducts().subscribe((data)=>{
      this.products = JSON.parse(JSON.stringify(data));
    })
  }

//delete product
delete(i){
  console.log(i);
  if(confirm('Are you sure?')===true){
  this.productService.deleteProduct(i)
  .subscribe((res)=>{
    console.log('deleted');
    //location.reload();
    // this.products = JSON.parse(JSON.stringify(data));
  })
}
 }


}
