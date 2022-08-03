import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { BasketComponent } from './basket/basket.component';
import { ProfileComponent } from './profile/profile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchFormComponent,
		HomeComponent,
		ResultsComponent,
		BasketComponent,
		ProfileComponent
	],
	imports: [ BrowserModule,HttpClientModule, AppRoutingModule, ReactiveFormsModule, MatCheckboxModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
