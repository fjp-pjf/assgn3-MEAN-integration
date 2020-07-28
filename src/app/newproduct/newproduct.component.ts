import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductModel } from '../productlist/product.model';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  public mode = "create";
  private pid: string;
  singleProduct:any;
  title:String = "";
  constructor(private productService:ProductsService,private router:Router,public activeRoute:ActivatedRoute ) { }
  productItem = new ProductModel(null,null,null,null,null,null,null,null);

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")){
        this.mode = "update";
        this.pid = paramMap.get("productId");
        this.title='Edit Product';
        // this.isLoading = true;
        this.productService.getSingleProduct(this.pid).subscribe(product => {
          // this.isLoading = false;
          this.singleProduct = JSON.parse(JSON.stringify(product)) ;
          console.log(this.singleProduct);
          let {
            productId,
            productName,
            productCode,
            releaseDate,
            description,
            price,
            starRating,
            imageUrl  }=this.singleProduct.product;

            this.productItem= new ProductModel(productId,productName,productCode,releaseDate,description,price,starRating,imageUrl);
        });


      } else {
        this.mode = "create";
        this.pid = null;
        this.title='Create Product';
        this.productItem= new ProductModel(null,null,null,null,null,null,null,null);
      }
    });
  }
  

  AddProduct(){
    if(this.mode=="create"){
      this.productService.newProduct(this.productItem);
      console.log("called");
      alert("Success");
    }
    else{
      this.productService.editProduct(this.productItem,this.pid)
      console.log('Edit successful');
      alert('item updated');
    }
    this.router.navigate(['/']);
  }


}
