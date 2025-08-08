import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
interface TrackingDataResponse
{
  "lineup": string,
  "article": string,
  "msp": string,
  "tsp": string,
  "msRecivedDate": string,
  "papupload": string,
  "ceCompleted": string,
  "proofUpload": string,
  "revRecDate": string,
  "revUploadDate": string,
  "revUpl": string,
  "revisedProofFromAuthor": string,
  "ceTatDays": string,
  "ceTatColorFlag": string,
  "compTatDays": string,
  "compTatDaysColorFlag": string,
  "authorTAT": string,
  "revisesTAT": string,
  "revisesTATDaysColorFlag": string,
  "revises2TAT": string,
  "revises2TATDaysColorFlag": string,
  "publishTAT": string
  
}
interface dropDownAPI
  {
        "journalId": string,
        "abbreviation": string,
        "journal": string,
        "volume": string,
        "issue": string
    
}
interface TrackingDataResponse_DC{
    
        "journal": string,
        "article": string,
        "authordate": string,
        "editordate": string,
        "msp": string,
        "tsp": string,
        "msRecivedDate": string,
        "papupload": string,
        "copyeditingCompletionDate": string,
        "proofToAuthor":string,
        "revisionRevisedDate": string,
        "revisionCompletedDate": string,
        "revision2RecivedDate": string,
        "revision2CompletedDate": string,
        "deliveryToAtyponDate": string,
        "revUploadDate": string,
        "revUpl": string,
        "revisedProofFromAuthor": string,
        "ceTatDays": string,
        "ceTatColorFlag": string,
        "compTatDays": string,
        "compTatDaysColorFlag": string,
        "authorTAT": string,
        "revisesTAT": string,
        "revisesTATDaysColorFlag": string,
        "revises2TAT": string,
        "revises2TATDaysColorFlag": string,
        "publishTAT": string
    
}

const BASE_URL = 'http://192.168.140.103:8089';

@Injectable({
  providedIn: 'root'
})
export class FetchService implements OnInit {
 logoUrl: string = '';
 clientAbbreviation:string = '';
 userDtls : {'userId':string,'clientId':string , 'defModule': string};


 

 

  constructor(private http : HttpClient,private auth : AuthService) { }
  ngOnInit(): void {
    this.userDtls = this.auth.getUser();
    
  }
//   fetchClientLogo(url:string){
//     let clientlogoDetails = [];

//     return(this.http.get(`${BASE_URL}/${url}`).pipe(map((responseData)=>{
//       clientlogoDetails.push(responseData);
//       return clientlogoDetails;

//   })));
// }
fetchClientLogo(url:string){

return(this.http.get(url).pipe(map((responseData)=>{
let clientlogoDetails = [];
for(const key in responseData)
{
  if(responseData.hasOwnProperty(key))
  {
    clientlogoDetails.push(responseData[key]);
  }
}
return clientlogoDetails;

})));
}
fetchTrackingData(input1 :string,input2 : string,input3:string,masterFlag:number,backlogFlag :number,billFlag : number,unassignedFlag :number,serviceFlag : number){
  

    return( this.http.post<TrackingDataResponse[]>(`${BASE_URL}/powertrack/ASCB/fetch/tracking/data`,{
      input1 :input1,
      input2 : input2,
      input3:input3,
      masterFlag:masterFlag,
      backlogFlag:backlogFlag,
      billFlag:billFlag,
      unassignedFlag:unassignedFlag,
      serviceFlag: serviceFlag
    }));
  }
dropdownData(clientId){
    const url = `${BASE_URL}/powertrack/journals/${clientId}`;
    return(this.http.get<dropDownAPI>(url).pipe(map((responseData)=>{
      const acceptedData = [];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key))
        {
          acceptedData.push(responseData[key]);
        }
      }
      return acceptedData;
  
    })));

}
 fetchTrackingData_DC(input1 :string,input2 : string,input3:string,masterFlag:number,backlogFlag :number,billFlag : number,unassignedFlag :number,serviceFlag : number){
  
    return( this.http.post<TrackingDataResponse_DC[]>(`${BASE_URL}/powertrack/DC/fetch/tracking/data`,{
      input1 :input1,
      input2 : input2,
      input3:input3,
      masterFlag:masterFlag,
      backlogFlag:backlogFlag,
      billFlag:billFlag,
      unassignedFlag:unassignedFlag,
      serviceFlag: serviceFlag
    }));

 } 
  writetoDB(clientRef,comments,userId,mailFrom,mailTo,mailCc,mailBcc){
      const url = `${BASE_URL}/powertrack/mail/insert`;
      return(this.http.post(url,{
      clientRef :clientRef,
      comments : comments,
      userId:userId,
      mailFrom:mailFrom,
      mailTo:mailTo,
      mailCc:mailCc,
      mailBcc:mailBcc,
    },{ responseType: 'text' }));
 

  }

 getgraphData(flag): Observable<any> {
    const url = `${BASE_URL}/powertrack/graph/${flag}`;
    return(this.http.get(url).pipe(map((responseData)=>{
      const acceptedData = [];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key))
        {
          acceptedData.push(responseData[key]);
        }
      }
      return acceptedData;
  
    })));
  }
  fetchdropdownDtls(clientId, journalId, userId){
    return( this.http.post(`${BASE_URL}/powertrack/dropdown/data`,{
      clientId :clientId,
      journalId : journalId,
      userId:userId,
    }));

  }
  fetchTrackingDataIssue(input1,input2,input3:string,masterFlag:number,backlogFlag :number,billFlag : number,unassignedFlag :number,serviceFlag : number){
  
console.log(input1,input2,input3,masterFlag, "From_Fetch");
    return( this.http.post<TrackingDataResponse[]>(`${BASE_URL}/powertrack/ASCB/fetch/tracking/data`,{
      input1 :input1,
      input2 : input2,
      input3:input3,
      masterFlag:masterFlag,
      backlogFlag:backlogFlag,
      billFlag:billFlag,
      unassignedFlag:unassignedFlag,
      serviceFlag: serviceFlag
    }));
  }

   fetchTrackingDataIssue_DC(input1,input2,input3:string,masterFlag:number,backlogFlag :number,billFlag : number,unassignedFlag :number,serviceFlag : number){
  

    return( this.http.post<TrackingDataResponse[]>(`${BASE_URL}/powertrack/DC/fetch/tracking/data`,{
      input1 :input1,
      input2 : input2,
      input3:input3,
      masterFlag:masterFlag,
      backlogFlag:backlogFlag,
      billFlag:billFlag,
      unassignedFlag:unassignedFlag,
      serviceFlag: serviceFlag
    }));
  }
  
  
}
