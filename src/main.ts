import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, HttpClientModule )]
})
  .catch(err => console.error(err));
