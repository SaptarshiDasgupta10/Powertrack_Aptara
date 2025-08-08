import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  value:boolean = true;
  logoUrl:string = ''
  constructor(private fetch : FetchService){}

  ngOnInit(): void {
    this.logoUrl = this.fetch.logoUrl;

    
  }
 
  toggle(){
    this.value = !this.value;
  }

}
