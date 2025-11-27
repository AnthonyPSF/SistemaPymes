import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './Components/login/login';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Menu } from './Components/menu/menu';
import { CommonModule } from '@angular/common';
import { Dashboard } from './Components/dashboard/dashboard';


@NgModule({
  declarations: [
    App,
    Login,
    Menu,
    Dashboard
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule, ReactiveFormsModule,CommonModule,
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),provideHttpClient(withFetch()),
  ],
  bootstrap: [App]
})
export class AppModule {
  
 }
