import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CLIENT_DATA } from '../clients';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.css'
})
export class NavTabsComponent implements OnInit {
  @Input () cFlag:number;
  userDtls : {'userId':string,'clientId':string};
  client:string;
  constructor(private auth : AuthService ,private fetch : FetchService){}
  ngOnInit(): void {
    this.userDtls = JSON.parse(localStorage.getItem('userDtls'));
    let key = this.userDtls['clientId'];
    console.log(key ,"key");
    this.client = CLIENT_DATA[0][key];
    console.log(this.client ,"client"); 
    this.fetch.clientAbbreviation = this.client;
   }
  logOut(){
    console.log(this.client);
    this.auth.logout(this.client);

  }


}
