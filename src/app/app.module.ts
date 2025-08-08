import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TrackingComponent } from './tracking/tracking.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { DataTablesModule } from 'angular-datatables';
import { DataTables2Component } from './data-tables2/data-tables2.component';
import {  ModuleRegistry } from "ag-grid-community";
import { AuthComponent } from './auth/auth.component';
import { Datatables3Component } from './datatables3/datatables3.component';
import { NavTabsComponent } from './nav-tabs/nav-tabs.component';
import { AuthGuard } from './auth/auth.guard';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UserCommentComponent } from './user-comment/user-comment.component';


const appRoutes : Routes = [{ path: 'login/:client', component: AuthComponent  },{path:'main',component: MainLayoutComponent,children:[{path:'home' , component:HomeComponent ,  canActivate:[AuthGuard] },{path: 'tracking',component: TrackingComponent , canActivate:[AuthGuard]},{path: 'calendar',component: Datatables3Component,  canActivate:[AuthGuard]},{path: 'comment',component: UserCommentComponent,  canActivate:[AuthGuard]}, { path: '**', redirectTo: 'login/default' } ] , canActivate:[AuthGuard]}];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavPanelComponent,
    HomeComponent,
    TrackingComponent,
    MainLayoutComponent,
    DataTablesComponent,
    DataTables2Component,
    AuthComponent,
    Datatables3Component,
    NavTabsComponent,
    Graph1Component,
    Graph2Component,
    Graph3Component,
    SpinnerComponent,
    UserCommentComponent
   
  ],
  imports: [
     BrowserModule,NgApexchartsModule,MatIconModule, HttpClientModule ,FormsModule , RouterModule.forRoot(appRoutes, {useHash: true}),DataTablesModule , AgGridModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
