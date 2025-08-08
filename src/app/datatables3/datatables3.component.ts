import { Component, Input, OnInit,NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { themeBalham } from 'ag-grid-community';


import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridReadyEvent,ColGroupDef,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
  PaginationNumberFormatterParams,
   } from "ag-grid-community";
   import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { FetchService } from '../fetch.service';
import { AuthService } from '../auth.service';

ModuleRegistry.registerModules([AllCommunityModule]);






interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}


@Component({
  selector: 'app-datatables3',
  templateUrl: './datatables3.component.html',
  styleUrl: './datatables3.component.css'
})
export class Datatables3Component implements OnInit {
// Row Data: The data to be displayed.
pagination = true;
paginationPageSize = 12;
textInput:string = '';
writeDBflag:boolean = false;
articleName:string;

userDtls : {'userId':string,'clientId':string , 'defModule': string};

flagModal:boolean = false;
@Input() journalData : [];
 gridOptions: GridOptions = {
  theme: themeBalham,
  
  sideBar: true,
};
constructor(private http: HttpClient, private ngZone: NgZone , private fetch : FetchService , private auth : AuthService) {}
ngOnInit(): void {
  this.userDtls = this.auth.getUser();
    (window as any).openArticlePopup = (articleName: string) => {
      this.ngZone.run(() => {
        this.openPopup(articleName);
      });
    };
    this.userDtls =  this.auth.getUser();
  if(this.userDtls['clientId'] === '2224'){
    this.colDefs.splice(2,0,{ field: "authordate" , width: 90,headerName:'AuthorDate'},{ field: "editordate" , width: 70,headerName:'EditorDate'});
  }
  
}

// Column Definitions: Defines & controls grid columns.
colDefs: ColDef[] = [
  { field: "journal", filter: true , width:90, headerName: 'Journals' },
  {
  field: "article",
  headerName: 'Article No',
  width: 110,
  filter: true,
  cellStyle: { fontSize: '12px' },
  cellRenderer: (params) => {
    const articleName = params.value;
    
    
    // You pass the journal name as a JSON string in the onclick
    return `<a style="cursor:pointer; color:blue;" onclick ="window.openArticlePopup('${articleName}')">${articleName}</a>`;
  }
},
  { field: "msp" , width: 70,headerName:'MSP' ,cellStyle: { fontSize: '12px' }},
  { field: "tsp" , width: 70, headerName:'TSP',cellStyle: { fontSize: '12px' } },
  { field: "msRecivedDate" , width: 115 , headerName:'MS Received Date' ,cellStyle: { fontSize: '12px' }},
  { field: "papupload" , width: 80, headerName: 'PAP Upload',cellStyle: { fontSize: '12px' }},
  { field: "copyeditingCompletionDate" , width: 160, headerName:'Copyediting Completion Date' , cellStyle: { fontSize: '12px' } },
  { field: "proofToAuthor" , width: 110,headerName:'Proof to Author' , cellStyle: { fontSize: '12px' }},
  { field: "revisionRevisedDate" , width: 140 ,headerName:'Revision Received Date', cellStyle: { fontSize: '12px' }},
  { field: "revisionCompletedDate" , width: 140,headerName:'Revision Completed Date' , cellStyle: { fontSize: '12px' }},
  { field: "revision2RecivedDate " , width: 120,headerName:'Revision 2 Received Date' , cellStyle: { fontSize: '12px' }},
  { field: "revision2CompletedDate" , width: 110,headerName:'Revised 2 Completed Date' , cellStyle: { fontSize: '12px' }},
  { field: "deliveryToAtyponDate" , width: 100,headerName:'Delivery to Atypon Date' , cellStyle: { fontSize: '12px' }},
  { field: "ceTatDays" , width: 80 ,headerName : 'CE TAT' ,cellStyle: { fontSize: '12px' }},
  { field: "compTatDays" , width: 80, headerName : 'COMP TAT' ,cellStyle: { fontSize: '12px' }},
  { field: "authorTAT" , width: 80,headerName : 'AUT TAT' ,cellStyle: { fontSize: '12px' }},
  { field: "revisesTAT " , width: 80,headerName : 'REV TAT' , cellStyle: { fontSize: '12px' }},
  { field: "revises2TAT" , width: 80,headerName : 'REV 2 TAT' , cellStyle: { fontSize: '12px' }},
  { field: "publishTAT" , width: 80,headerName : 'PUBLISH TAT' , cellStyle: { fontSize: '12px' }},
];

defaultColDef: ColDef = {
  filter: true,
  

  floatingFilter:true
}


openPopup(article){
  this.flagModal = true;
  this.articleName = article;
  console.log(article,this.flagModal);

}
onCloseHandledModal() {

  this.flagModal = false;
  console.log(this.flagModal);
 }
 handleSubmit(){
 const mailFrom  = "dbaadmin@aptaracorp.com";
 const mailTo  = "manas.kumar@aptaracorp.com";
 const mailCc  = "vaibhav.mishra1@aptaracorp.com";
 const mailBcc = "saptarshi.dasgupta@aptaracorp.com";
 this.writeDBflag  = true;
       this.fetch.writetoDB(this.articleName,this.textInput,this.userDtls['userId'],mailFrom,mailTo,mailCc,mailBcc).subscribe({
      next: (response) => {
        this.writeDBflag = false;
        console.log(response);
      },
      error: (error) => {

        console.error("Something went wrong", error);
      }
    });




 }
onGridReady(params: GridReadyEvent) {
  // this.http
  //   .get<
  //     any[]
  //   >("https://www.ag-grid.com/example-assets/space-mission-data.json")
  //   .subscribe((data) => (this.rowData = data));
}


  // private gridApi;
  // private gridColumnApi;
  //  columnDefs: ColDef[] = [];
  // private sortingOrder;
  // rowData = [{make:"Tesla",model: "Model Y",price :64950 , electric: true},
  //             {make:"Ford",model: "F-Series",price :33850 , electric: false},
  //             {make:"Ford",model: "F-Series",price :33850 , electric: false},
  //             {make:"Ford",model: "F-Series",price :33850 , electric: false},

  //           ]

  // constructor(){
  //   this.columnDefs=[
  //     {field: "make"},{
  //       field: "model"
  //     },
  //     {
  //       field: "price"
  //     },
  //     {
  //       field:"electric"
  //     }
  //   ]
  // }
  // onGridReady(params){
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   let dataValue = [{"firstName":"Saptarshi","age":22}]
  //   params.api.setRowData(dataValue);

  // }

}
