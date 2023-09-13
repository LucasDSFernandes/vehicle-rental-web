import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormComponent } from './pages/admin/form/form.component';

// Services
import { RentalService } from './services/rental.service';
import { VehiclesService } from './services/vehicles.service';
import { UtilsService } from './services/utils.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    RentalService,
    VehiclesService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
