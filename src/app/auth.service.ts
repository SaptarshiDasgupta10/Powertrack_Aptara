import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CLIENT_DATA } from './clients';


interface AuthResponse
{
  
    "userId": string,
    "firstName": string,
    "lastName": string,
    "defaultModuleId": string,
    "defaultfilename": null,
    "clientId": string,
    "userType": string,
    "clientShortName": string,
    "clientName": string,
    "timezone":string,
    "filenames": Object[]
  
}
const BASE_URL = 'http://192.168.140.103:8089';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDtls : {'userId':string,'clientId':string};
  

  constructor(private http: HttpClient,private route : Router) { }
  login(userName:string , passWord : string ,cid : number){
    console.log(userName,passWord);

    return(this.http.post<AuthResponse>(`${BASE_URL}/powertrack/client/data`,{userName:userName,
      userPass:passWord,clid: `${cid}`}));
  }
  
  
  getClientDetails(): Observable<any> {
    const url = `${BASE_URL}/powertrack/login/ascb`;
    return this.http.get(url);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('userDtls'));
  }
  
  
  isLoggedIn() {
    return this.getUser()!= null ;
  }
  
  logout(client) {
    this.userDtls = JSON.parse(localStorage.getItem('userDtls'));
    

    localStorage.removeItem('userDtls');

    this.route.navigate([`login/${client}`]);
  }
  handleError (err:HttpErrorResponse){
    console.log(err);
    let errorMssg = ` Status is ${err.status} , ${err.statusText} `;
     return (errorMssg);
  
  }
}
