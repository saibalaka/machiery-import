import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { routerGuard } from './router.guard';
import { ProductsComponent } from './products/products.component';
import { RequestsComponent } from './requests/requests.component';

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
    canActivate:[routerGuard]
  },
  {
    path:'requests',
    component:RequestsComponent,
    canActivate:[routerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
