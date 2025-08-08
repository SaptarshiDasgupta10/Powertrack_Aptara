import { Component, OnInit  } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

   isAuth:boolean;
   cFlag: number = 0;
   headerDisplay:boolean = true;
  

  ngOnInit(): void {


   
    
  }
  constructor() {
 
  }


}
