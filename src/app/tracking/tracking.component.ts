import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
//  import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit {
  cFlag: number = 1;
  isFetching:boolean = false;
  trackingData  = [];
  jid:string;
  volume:string;
  issue:string;
  journalNumber: string;
  issueDropdownList:any = [];

  isFetchingDropdownValue : boolean = false;
  input1:string = 'all';
  input2:string =null;
  input3:string = null; 
  sDate: string = '';
  eDate : string = '';
  masterFlag:number = 1;
  backlogFlag:number =  0;
  billFlag:number =  0;
  unassignedFlag:number =  0;
  journalType: string = null;
  journalList:any = [];
  masterFlagSpecific:number = 2;
  errorMssg: string = null;
  error:string = '';
  count:number = 0;
  journalID = {'CBE' : '4577', 'MBC' : '4576'};
  userDtls : {'userId':string,'clientId':string , 'defModule': string};
  selectedArticle :string =  'All Articles';
  journalDropDownList:any = [];
  clientreference:string = '';
   checkboxesVal = {
    billed: false,
    unassigned: false,
    backlog:false
  };
  constructor(private fetch : FetchService, private auth : AuthService){}

  ngOnInit(): void {
    this.userDtls = this.auth.getUser();
   

    
  }
  fetchData(input1,input2,input3,masterFlag,backlogFlag,billFlag,unassignedFlag,serviceFlag){
    
  this.isFetching = true;
  this.trackingData = [];
  if(this.userDtls['clientId'] === '1067'){
  this.fetch.fetchTrackingData(input1,input2,input3,masterFlag,backlogFlag,billFlag,unassignedFlag,serviceFlag).subscribe({
      next: (response) => {
        console.log('Tracking Data:', response);
        this.isFetching = false;
        this.trackingData = response;
      },
      error: (error) => {

        console.error('Login failed:', error);

        if (error.status === 404) {
          this.errorMssg = 'No Data Found';
        } else {
          this.errorMssg = 'Something went wrong. Please try again later.';
        }
      }
    });
  }
  else
    {
    this.fetch.fetchTrackingData_DC(input1,input2,input3,masterFlag,backlogFlag,billFlag,unassignedFlag,serviceFlag).subscribe({
      next: (response) => {
        console.log('Tracking Data:', response);
        this.isFetching = false;
        this.trackingData = response;
      },
      error: (error) => {

        console.error('Login failed:', error);

        if (error.status === 404) {
          this.errorMssg = 'No Data Found';
        } else {
          this.errorMssg = 'Something went wrong. Please try again later.';
        }
      }
    });

  }

        
  }
  onSelectJournalId(event){
    if(event.target.value === 'Select Journal'){
      this.journalNumber = null;
    }

    if(this.journalDropDownList.length>0 && event.target.value !== 'Select Journal' )
    {
    this.journalNumber = this.journalDropDownList.filter(p=> p['abbreviation'] === event.target.value)[0]['journalId'];
    
    console.log(this.journalNumber);
    }


  }
  // onSelectJournal(e){
  //   if(e.target.value === 'Select Journal')
  //   {
  //     this.journalType = null;

  //   }
  //   else{
  //   this.journalType = e.target.value;
  //   console.log(this.journalType);
  //   this.userDtls = this.auth.getUser();
    
  //   this.jid = this.journalType === 'CBE'? this.journalID['CBE'] : this.journalID['MBC'];
  //   this.isFetchingDropdownValue = true;
  //   this.fetch.fetchdropdownDtls(this.userDtls.clientId,this.jid,this.userDtls.userId).subscribe({
  //       next: (response) => {
  //         this.isFetchingDropdownValue = false;
  //         console.log('Tracking Data:', response);
  //         this.journalDropDownList = response;
    

  //       },
  //       error: (error) => {
  
  //         console.error(error);
  
  //         if (error.status === 404) {
  //           this.errorMssg = 'No Data Found';
  //         } else {
  //           this.errorMssg = 'Something went wrong. Please try again later.';
  //         }
  //       }
  //     });



    
    
  //   }

  // }
  selectIssue(e){
    if(e.target.value !== 'Select Issue'){
    let issueString = e.target.value.split('-');
      console.log(issueString ,"VIVO");
    this.volume = issueString[1];
    this.issue = issueString[2];
    console.log(this.volume,this.issue, "Huo");
    }
   
  }
  onSelectJournalIssue(e){
    

    this.userDtls = this.auth.getUser();
 

    this.isFetchingDropdownValue = true;
    this.fetch.fetchdropdownDtls(this.userDtls.clientId,this.journalNumber,this.userDtls.userId).subscribe({
        next: (response) => {
          this.isFetchingDropdownValue = false;
          this.issueDropdownList = response;
          console.log(this.issueDropdownList)
    

        },
        error: (error) => {
  
          console.error(error);
  
          if (error.status === 404) {
            this.errorMssg = 'No Data Found';
          } else {
            this.errorMssg = 'Something went wrong. Please try again later.';
          }
        }
      });
  

    // console.log(issueString,"HELLO");
    // if(issueString[0] === 'Select Journal'){
    //   console.log("Hello Hello");
    //   this.issueDropdownList = [];
    // }
  
  // else{
  //   this.issueDropdownList = [];
  // }
    

  }
  formatDate(date :string){
  let parts = date.split('-');
  let year = parts[0];
  let month = parts[1];
  let day = parts[2];
  let formattedDate = `${month}/${day}/${year}`;

console.log(formattedDate);
return formattedDate;

  }
  onRadioChange(){
     this.isFetchingDropdownValue = true;

    this.fetch.dropdownData(this.userDtls['clientId']).subscribe({
    next: (response) => {
      this.isFetchingDropdownValue = false;
      this.journalDropDownList = response;
      console.log(this.journalDropDownList)
    },
    error: (error) => {

      console.error('Login failed:', error);

      if (error.status === 404) {
        this.errorMssg = 'No Data Found';
      } else {
        this.errorMssg = 'Something went wrong. Please try again later.';
      }
    }
  })

  }
  generateTable(form:NgForm){
    this.errorMssg = null;
    this.count = 1;
    console.log(form);
    console.log(this.checkboxesVal);
    console.log(this.selectedArticle);
    if(this.selectedArticle === 'All Articles'){
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false){
    //        this.isFetching = true;
    //        this.trackingData = [];
    // this.fetch.fetchTrackingData(this.input1,this.input2,this.input3,this.masterFlag,0,0,0,0).subscribe({
    //   next: (response) => {
    //     console.log('Tracking Data:', response);
    //     this.isFetching = false;
    //     this.trackingData = response;
    //   },
    //   error: (error) => {

    //     console.error('Login failed:', error);

    //     if (error.status === 404) {
    //       this.errorMssg = 'No Data Found';
    //     } else {
    //       this.errorMssg = 'Something went wrong. Please try again later.';
    //     }
    //   }
    // });
    this.billFlag = 0;
          this.unassignedFlag = 0;
          this.backlogFlag = 0;
    
    this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0)

      }
        if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false){
          this.billFlag = 1;
          this.unassignedFlag = 0;
          this.backlogFlag = 0;
                this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0);
              }
               if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false){
          this.unassignedFlag = 1;
          this.billFlag = 0;
          this.backlogFlag = 0;
                this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0);
              }
               if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true){
          this.backlogFlag = 1;
          this.billFlag = 0;
          this.unassignedFlag = 0;
        
                this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0);
              }
               if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true){
          this.backlogFlag = 1;
          this.billFlag = 0;
          this.unassignedFlag = 1;
        
                this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0);
              }
               if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true){
          this.backlogFlag = 1;
          this.billFlag = 1;
          this.unassignedFlag = 0;
        
                this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0);
              }
               if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false){
          this.backlogFlag = 0;
          this.billFlag = 1;
          this.unassignedFlag = 1;
        
                this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0);
              }
               if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true){
          this.backlogFlag = 1;
          this.billFlag = 1;
          this.unassignedFlag = 1;
        
                this.fetchData(this.input1,this.input2,this.input3,this.masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0);
              }
    
   
  }
  if(this.selectedArticle === 'Due from date'){
    let masterFlag = 5;
        if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false) {
      this.billFlag = 0;
      this.unassignedFlag = 0;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false) {
      this.billFlag = 1;
      this.unassignedFlag = 0;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false) {
      this.billFlag = 0;
      this.unassignedFlag = 1;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true) {
      this.billFlag = 0;
      this.unassignedFlag = 0;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true) {
      this.billFlag = 1;
      this.unassignedFlag = 0;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true) {
      this.billFlag = 0;
      this.unassignedFlag = 1;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false) {
      this.billFlag = 1;
      this.unassignedFlag = 1;
      this.backlogFlag = 0;
    }
        if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true) {
      this.billFlag = 1;
      this.unassignedFlag = 1;
      this.backlogFlag = 1;
      }

    this.sDate = form.value.sdate;
    let sDate = this.formatDate(this.sDate);
    this.eDate = form.value.edate;
    let eDate =  this.formatDate(this.eDate);
    this.isFetching = true;
     if(this.userDtls['clientId'] === '1067'){
       this.fetch.fetchTrackingData(sDate,eDate,this.input3,masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0).subscribe({
      next: (response) => {
        this.isFetching = false;
        console.log('Tracking Data:', response);
        this.trackingData = response;
      },
      error: (error) => {

        console.error('Login failed:', error);

        if (error.status === 404) {
          this.errorMssg = 'No Data Found';
        } else {
          this.errorMssg = 'Something went wrong. Please try again later.';
        }
      }
    });
  }
  else{
     this.fetch.fetchTrackingData_DC(sDate,eDate,this.input3,masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0).subscribe({
      next: (response) => {
        this.isFetching = false;
        console.log('Tracking Data:', response);
        this.trackingData = response;
      },
      error: (error) => {

        console.error('Login failed:', error);

        if (error.status === 404) {
          this.errorMssg = 'No Data Found';
        } else {
          this.errorMssg = 'Something went wrong. Please try again later.';
        }
      }
    });

  }

 

  }
  if(this.selectedArticle === 'Specific Articles'){
    let masterFlag = 2;
    this.isFetching = true;
    if(this.userDtls['clientId'] === '1067'){
    this.fetch.fetchTrackingData(this.clientreference,this.input2,this.input3,masterFlag,0,0,0,0).subscribe({
      next: (response) => {
        this.isFetching = false;
        console.log('Tracking Data:', response);
        this.trackingData = response;
      },
      error: (error) => {

        console.error('Login failed:', error);

        if (error.status === 404) {
          this.errorMssg = 'No Data Found';
        } else {
          this.errorMssg = 'Something went wrong. Please try again later.';
        }
      }
    });
  }
  else{
     this.fetch.fetchTrackingData_DC(this.clientreference,this.input2,this.input3,masterFlag,0,0,0,0).subscribe({
      next: (response) => {
        this.isFetching = false;
        console.log('Tracking Data:', response);
        this.trackingData = response;
      },
      error: (error) => {

        console.error('Login failed:', error);

        if (error.status === 404) {
          this.errorMssg = 'No Data Found';
        } else {
          this.errorMssg = 'Something went wrong. Please try again later.';
        }
      }
    });

  }


  }
  if(this.selectedArticle === 'Specific Journal'){
    let masterFlag = 3;
   
    if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false) {
      this.billFlag = 0;
      this.unassignedFlag = 0;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false) {
      this.billFlag = 1;
      this.unassignedFlag = 0;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false) {
      this.billFlag = 0;
      this.unassignedFlag = 1;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true) {
      this.billFlag = 0;
      this.unassignedFlag = 0;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true) {
      this.billFlag = 1;
      this.unassignedFlag = 0;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true) {
      this.billFlag = 0;
      this.unassignedFlag = 1;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false) {
      this.billFlag = 1;
      this.unassignedFlag = 1;
      this.backlogFlag = 0;
    }
        if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true) {
      this.billFlag = 1;
      this.unassignedFlag = 1;
      this.backlogFlag = 1;
      }
  this.isFetching = true;
  if(this.userDtls['clientId'] === '1067'){
  this.fetch.fetchTrackingData(this.journalNumber,null,null,masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0).subscribe({
    next: (response) => {
      this.isFetching = false;
      this.trackingData = response;
    },
    error: (error) => {

      console.error('Login failed:', error);

      if (error.status === 404) {
        this.errorMssg = 'No Data Found';
      } else {
        this.errorMssg = 'Something went wrong. Please try again later.';
      }
    }
  });
}
else{
   this.fetch.fetchTrackingData_DC(this.journalNumber,null,null,masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0).subscribe({
    next: (response) => {
      this.isFetching = false;
      this.trackingData = response;
    },
    error: (error) => {

      console.error('Login failed:', error);

      if (error.status === 404) {
        this.errorMssg = 'No Data Found';
      } else {
        this.errorMssg = 'Something went wrong. Please try again later.';
      }
    }
  });

}

}
if(this.selectedArticle === 'Issue'){
  let masterFlag = 4;
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false) {
      this.billFlag = 0;
      this.unassignedFlag = 0;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === false) {
      this.billFlag = 1;
      this.unassignedFlag = 0;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false) {
      this.billFlag = 0;
      this.unassignedFlag = 1;
      this.backlogFlag = 0;
    }
      if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true) {
      this.billFlag = 0;
      this.unassignedFlag = 0;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === false && this.checkboxesVal.backlog === true) {
      this.billFlag = 1;
      this.unassignedFlag = 0;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === false && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true) {
      this.billFlag = 0;
      this.unassignedFlag = 1;
      this.backlogFlag = 1;
    }
       if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === false) {
      this.billFlag = 1;
      this.unassignedFlag = 1;
      this.backlogFlag = 0;
    }
        if(this.checkboxesVal.billed === true && this.checkboxesVal.unassigned === true && this.checkboxesVal.backlog === true) {
      this.billFlag = 1;
      this.unassignedFlag = 1;
      this.backlogFlag = 1;
      }
  this.isFetching = true;
  // console.log(this.volume,this.issue,"Manas");
  if(this.userDtls['clientId'] === '1067'){
  this.fetch.fetchTrackingDataIssue(this.journalNumber,this.volume,this.issue,masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0).subscribe({
    next: (response) => {
      this.isFetching = false;
      console.log('Tracking Data:', response);
      this.trackingData = response;
    },
    error: (error) => {

      console.error('Login failed:', error);

      if (error.status === 404) {
        this.errorMssg = 'No Data Found';
      } else {
        this.errorMssg = 'Something went wrong. Please try again later.';
      }
    }
  });

}
else{
   this.fetch.fetchTrackingDataIssue_DC(this.journalNumber,this.volume,this.issue,masterFlag,this.backlogFlag,this.billFlag,this.unassignedFlag,0).subscribe({
    next: (response) => {
      this.isFetching = false;
      console.log('Tracking Data:', response);
      this.trackingData = response;
    },
    error: (error) => {

      console.error('Login failed:', error);

      if (error.status === 404) {
        this.errorMssg = 'No Data Found';
      } else {
        this.errorMssg = 'Something went wrong. Please try again later.';
      }
    }
  });

}
}

  }
 

}
