import { Component, Input, OnInit } from '@angular/core';
import { powertrackLogo } from '../powertrackLogo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() logoUrl:string;
  userDtls : {'userId':string,'clientId':string , 'defModule': string};
  clientLogo = [];
 constructor(){

 }
 ngOnInit(): void {
   console.log(this.logoUrl ,"Hello");
   if(this.logoUrl === ''){
    this.userDtls = JSON.parse(localStorage.getItem('userDtls'));
          let key = this.userDtls['clientId'];
   this.clientLogo =  powertrackLogo.filter((p)=>p['cid'].toString() === key)
   this.logoUrl = this.clientLogo[0]['logo'];
   }
 }

}
