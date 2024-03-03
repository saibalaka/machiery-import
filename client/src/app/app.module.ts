import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ProductsComponent } from './products/products.component';
import { QuotationComponent } from './quotation/quotation.component';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    ProductsComponent,
    QuotationComponent,
    RequestsComponent,
    ViewComponent,
    SellerProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
