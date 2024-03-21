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
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { SellerRequestsComponent } from './seller-requests/seller-requests.component';
import { BuyerRequestsComponent } from './buyer-requests/buyer-requests.component';
import { ImporterDetailsComponent } from './importer-details/importer-details.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { authenticationInterceptor } from './authentication.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';

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
    ViewComponent,
    SellerProductsComponent,
    SellerRequestsComponent,
    BuyerRequestsComponent,
    ImporterDetailsComponent,
    SingleProductComponent,
    PageNotFoundComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(withFetch()),provideHttpClient(withInterceptors([authenticationInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
