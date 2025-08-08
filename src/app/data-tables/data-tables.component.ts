import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
// import 'datatables.net-fixedcolumns-dt';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrl: './data-tables.component.css'
})
export class DataTablesComponent implements OnInit,AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  
  dtOptions: Config = {};
  data = [];
  ngOnInit(): void {
    this.data.push({'journal': 'CBE-24-1', 'articleNo': 'CBE-2401-106' ,'manuscriptPg':'66','typesheetPages':'18','receivedDt':'01/08/2025','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
      {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
      {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
      {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''},
    {'journal': 'CBE-24-1', 'articleNo': 'CBE-24-08-0211' ,'manuscriptPg':'79','typesheetPages':'23','receivedDt':'12/21/2024','PAP':'','copyEdit':'01/13/2025','prooftoAuthor':'01/15/2025','revRDate':'01/18/2025','revR2Date':'01/18/2025','revComp':'01/22/2025','revComp2':'02/21/2025','DelAtypon':'','CE_TAT':'5','COMP_TAT':'2','AUT_TAT':'3','REV_TAT':'4','REV2_TAT':'0','PUB_TAT':''}


  )
  
  
    this.dtOptions = {    
      "scrollX": true,
      
      "columnDefs": [
        { width: '90px !important', targets: '_all'} // Adjust the width of first 10 columns
      ],
    
      pagingType: 'full_numbers',
    
     "scrollCollapse": true,
     "paging": true,
     'autoWidth':false,
     ordering: true,
     info: true,
     
     columns: [
     {
       title: 'Journal',
       width: '200px !important'
     
       
     
     },
     {
       title: 'Article No',
       width: '15% !important'
  
    
     },
     {
      title: 'MSP',
     
    },
    {
      title: 'TSP',
   
    },
    {
      title: 'MS Rec Date',
     
      },
     
      {
        title: 'PAP Upload',
        
       
      },
      {
        title: 'CopyEdit Completion Date',
       
       
      },
      {
        title: 'Proof to Author',
  
       
      },
      {
        title: 'Revision Received Date',
       
      },
      {
        title: 'Revision Completed',
       
      },
      {
        title: 'Revision 2 Received Date',
       
      },
      {
        title:'Delivery to Atypon Date',

      },
      {
        title:'CE TAT',

      },
      {
        title:'COMP TAT',

      },
      {
        title:'Author TAT',

      },
      {
        title:'Revises TAT',

      },
      {
        title:'Revises 2 TAT',

      },
      {
        title: 'Publish TAT'
      }
  
  
  ],
  dom: 'lfBrtip',

 
    
  };
 
    
  }
  ngAfterViewInit(): void {
    



    
    this.datatableElement.dtInstance.then(dtInstance => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }

}
