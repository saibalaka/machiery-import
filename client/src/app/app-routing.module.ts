import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { routerGuard } from './router.guard';
import { ProductsComponent } from './products/products.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { SellerRequestsComponent } from './seller-requests/seller-requests.component';
import { BuyerRequestsComponent } from './buyer-requests/buyer-requests.component';
import { ImporterDetailsComponent } from './importer-details/importer-details.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'user',
    component:UserComponent,
    canActivate:[routerGuard]
  },
  {
    path:'products',
    component:ProductsComponent,
  },
  {
    path:'seller-requests',
    component:SellerRequestsComponent,
    canActivate:[routerGuard]
  },
  {
    path:'importer-details',
    component:ImporterDetailsComponent,
    canActivate:[routerGuard]
  },
  {
    path:'single-product/:id',
    component:SingleProductComponent,
    canActivate:[routerGuard]
  },
  {
    path:'buyer-requests',
    component:BuyerRequestsComponent,
    canActivate:[routerGuard]
  },
  {
    path:'seller-products',
    component:SellerProductsComponent,
    canActivate:[routerGuard]
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
