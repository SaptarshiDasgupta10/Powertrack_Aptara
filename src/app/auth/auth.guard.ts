import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../auth.service";
import { FetchService } from "../fetch.service";


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(private auth : AuthService ,private router :Router , private fetch : FetchService){}
    
    canActivate(route: ActivatedRouteSnapshot, router:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean | UrlTree>{
        if(!this.auth.isLoggedIn()){
            // console.log(this.fetch.clientAbbreviation,"Guard");
            
            this.router.navigate([`login/ascb`]);
        }
        return this.auth.isLoggedIn()

    }

}