import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard'



const routes: Routes = [{path:'',component:ProductlistComponent},
                        {path:'add',component:NewproductComponent,canActivate:[AuthGuard]},
                        {path:'login',component:LoginComponent},
                        {path:'register',component:RegisterComponent},
                        {path:'edit/:productId',component:NewproductComponent,canActivate: [AuthGuard]},
                        {path:'delete/:productId',component:ProductlistComponent,canActivate: [AuthGuard]}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
