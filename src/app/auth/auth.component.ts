import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CLIENT_DATA } from '../clients';
import { User } from '../user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isAuth:boolean;
  isFetching:boolean = false;
  cid:number;
  clientAbbreviation:string = '';
  clientConfig = [];
  clientDetails = [];
  clientDtlsApi:{
    "clientId": string,
    "client": string
  };
  errorDtls:string = '';
  error:string = '';
  clientName: string = '';
  logoUrl : string = '';
  passWord :string;
  userName : string;
  errorMessage: string = null;
  successMessage:string = null;
  user = new BehaviorSubject<User>(null);
  defaultFileName : string = '';
  userDtls : {'userId':string,'clientId':string , 'defModule': string};
  constructor(private auth : AuthService,private router : Router ,private route: ActivatedRoute,private http : HttpClient,private fetch:FetchService){
    
   
  }
  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      console.log("True");
      this.userDtls = JSON.parse(localStorage.getItem('userDtls'));
      let key = this.userDtls['clientId'];
      let client = CLIENT_DATA[key];
      let defModule = this.userDtls['defModule'];
      if(defModule === `${key}Home`  || defModule === `${key}Home.jsp`){
        this.router.navigate(['/main/home']);

      }
      if(defModule === `${key}Tracking` || defModule === `${key}Tracking.jsp`){
        this.router.navigate(['/main/tracking']);

      }
  }
 
  this.clientName = this.route.snapshot.paramMap.get('client') || 'default';
  console.log(this.clientName);
  
  // this.route.params.subscribe(p:Params)=>{
  //   this.clientName = p['client']

  // }

 this.isFetching = true;
   this.fetch.fetchClientLogo('assets/clientConfig.json').subscribe(response=>{
    
    this.isFetching = false;
    this.clientConfig = response;
   
    this.clientDetails = this.clientConfig.filter((p)=>p['client'] === this.clientName);
    console.log(this.clientConfig, this.clientDetails);
    if(this.clientDetails.length > 0){
    this.logoUrl = this.clientDetails[0]['logo'];
    this.clientAbbreviation = this.clientDetails[0]['client'];
    console.log(this.clientAbbreviation,"Auth");
    this.fetch.clientAbbreviation = this.clientAbbreviation;
    console.log(this.fetch.clientAbbreviation,"Auth1");

    
    this.fetch.logoUrl = this.logoUrl;
    console.log(this.logoUrl);
    }
    else{
      this.router.navigateByUrl('/login/undefined');
      return;
    }
  
  },err => {
  this.error = this.auth.handleError(err);

});
this.route.params.subscribe((data:Params)=>{
  this.clientName = data['client'];
  this.isFetching = true;
  this.fetch.fetchClientLogo('assets/clientConfig.json').subscribe(response=>{
   
   this.isFetching = false;
   this.clientConfig = response;
   this.clientDetails = this.clientConfig.filter((p)=>p['client'] === this.clientName);
   if(this.clientDetails.length === 0){
  
   this.router.navigateByUrl('/login/undefined');
   }
   else{
   console.log(this.clientConfig, this.clientDetails);
   this.logoUrl = this.clientDetails[0]['logo'];
   this.cid = this.clientDetails[0]['cid'];
   this.clientAbbreviation = this.clientDetails[0]['client'];
   this.fetch.logoUrl = this.logoUrl;
   console.log(this.logoUrl);
   }
 
 },err => {
 this.error = this.auth.handleError(err);

});

  console.log(this.clientName);


});

   }
   onSubmit(form:NgForm)
   {
     if(!form.valid){
       return;
     }
      this.userName = form.value.username;
      this.passWord = form.value.password;
      this.auth.login(this.userName,this.passWord ,this.cid).subscribe({
        next: (response) => {
          console.log('Login success:', response);
           const user = new User(response.userId,response.clientId,response.defaultfilename);
          this.user.next(user);
          this.errorMessage = null;
          const obj = JSON.stringify({userId:response.userId, clientId : response.clientId, defaultFileName: response.defaultfilename});
  
         
          localStorage.setItem('userDtls', obj);
          this.defaultFileName = response.defaultfilename;
          if(response.defaultfilename === `${response.clientId}Home` || response.defaultfilename === `${response.clientId}Home.jsp` ){
            this.router.navigate(['/main/home']);
            
          }
          if(response.defaultfilename === `${response.clientId}Tracking` || response.defaultfilename === `${response.clientId}Tracking.jsp`){
            this.router.navigate(['/main/tracking']);
          }
          this.auth.getClientDetails().subscribe({
            next: (data) => {
              this.clientDtlsApi = data;
              this.fetch.clientAbbreviation = this.clientDtlsApi['client'];
             
              console.log('Data received:', data);
              console.log(this.fetch.clientAbbreviation ,"cli");
            },
            error: (err) => {
              console.error('GET request error:', err);
              this.errorDtls = 'Failed to load data';
            }
          });
        

        },
        error: (error) => {

          console.error('Login failed:', error);
  
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'Something went wrong. Please try again later.';
          }
  
          this.successMessage = null;
        }
      });
  //    this.auth.login(this.userName,this.passWord).subscribe(resDta=>{
  //      console.log(resDta);
  //      if(resDta.STATUS === 'SUCCESS')
  //        {
  //          this.router.navigate(['/main/home']);
  //        }
  //        if(resDta.STATUS === 'FAIL')
  //          {
  //            this.error = resDta.MESSAGE;
  //            form.reset();
  //          }
       
  //    }, err=>{
  //    this.error =  this.authService.handleError(err);
  //    });
  //  }
    
  }
}
