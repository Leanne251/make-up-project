import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchAllProducts } from './search-all-products/search-all-products.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { BasketComponent } from './basket/basket.component';
import { ProfileComponent } from './profile/profile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSearchFormComponent } from './new-search-form/new-search-form.component';
import { ParamsResultsComponent } from './params-results/params-results.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchAllProducts,
		HomeComponent,
		ResultsComponent,
		BasketComponent,
		ProfileComponent,
  NewSearchFormComponent,
  ParamsResultsComponent
	],
	imports: [ BrowserModule,HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatProgressSpinnerModule],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
