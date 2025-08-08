import { Component,Input, OnInit , ViewChild  } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexPlotOptions
} from "ng-apexcharts";
import { FetchService } from '../fetch.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrl: './graph2.component.css'
})
export class Graph2Component implements OnInit {
   @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions2: Partial<ChartOptions>;
    isFetching:boolean = false;
    catA = [];
    catB = [];
    errorDtls:string = '';
    graphData = [];
    graphDataKeys = [];
    graphDataValues = [];
     @Input() headerDisplay : boolean;
     public isDisplay :boolean =  false;
     constructor(private fetch : FetchService){
      this.chartOptions = {
        "series": [
       {
         "name": "Received",
         "data": []
       },
       {
         "name": "Published",
         "data": []
       }
     ],
     chart: {
       type: 'bar',
       stacked: false,
       
       height: 262,
       width: 520,
       offsetX: 15,
       offsetY:-35,
       toolbar: {
        show: false,
        tools:{
          download: true
        }
       }
   },
   grid:{
     show: true,
     borderColor: '#90A4AE',
     strokeDashArray: 0,
     position: 'back',
     
     
   },
         colors: ['#2E72DA', '#B4B4B4','#FFCE1B'],
         plotOptions: {
           bar: {
             horizontal: false,
             columnWidth: '60%',
             
           },
         },
         dataLabels: {
           enabled: true,
           // position: 'top',
           textAnchor: "start",
           offsetY: 10,
           offsetX: -6,
           style: {
               fontSize: '9pt',
               fontFamily: ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
               colors:['black'],
   
               // fontWeight: 600
           }
         },
         stroke: {
           show: true,
           width: 2,
           colors: ['transparent']
         },
         
         // title: {
         //   text: 'Revenue Breakdown by Journals',
         //   align: 'center',
         //   style:{
         //     fontFamily: ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
   
         //   }
         // },
         // markers: {
         //   size: 4,
         // },
         xaxis: {
           categories: [],
           labels: {
             // rotate: -64,
             style:{
               fontFamily: ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
   
               fontSize: '9pt'
             }
            
           },
         },
         yaxis:{
         title: {
           text: 'Number of Articles',
           style:{
             fontFamily: '  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
             fontSize: '18px',
             fontWeight:650
          
             
   
           }
         },
         stepSize:1,
         },
         legend: {
          
           fontSize: '11px',
           position:'top',
           // fontWeight: 'bold',
           // fontFamily: 'Georgia',
           fontFamily: ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
   
           itemMargin: {
             vertical: 20
           }
         }
       };
    }
  ngOnInit(): void {
    
    this.isDisplay = this.headerDisplay;
    if(this.isDisplay)
      {
        if(window.screen.availWidth>=1500){
        this.chartOptions.chart.width = 550;
        this.chartOptions.chart.height = 320;
        // this.chartOptions.title.style.fontSize = '16px';
        this.chartOptions.legend.fontSize = '12px';
        this.chartOptions.chart.offsetY = 10;
        this.chartOptions.chart.offsetX = 30;
        this.chartOptions.legend.position = 'bottom';
    
        this.chartOptions.xaxis.labels.style.fontSize = '10px';
        }
        if(window.screen.availWidth>=1300 && window.screen.availWidth<1500){
          this.chartOptions.chart.width = 430;
          this.chartOptions.chart.height = 300;
          // this.chartOptions.title.style.fontSize = '16px';
          this.chartOptions.legend.fontSize = '12px';
          this.chartOptions.chart.offsetY = 10;
        this.chartOptions.chart.offsetX = 30;
          this.chartOptions.legend.position = 'bottom';
          // this.chartOptions.xaxis.labels.rotate = -21.5;
      
          this.chartOptions.xaxis.labels.style.fontSize = '10px';
  
        }
  
  
        if(window.screen.availWidth>=992 && window.screen.availWidth<1300) {
          this.chartOptions.chart.width = 400;
          this.chartOptions.chart.height = 300;
          // this.chartOptions.title.style.fontSize = '16px';
          // this.chartOptions.title.offsetX = 0;
          this.chartOptions.legend.fontSize = '12px';
          this.chartOptions.chart.offsetY = 10;
        this.chartOptions.chart.offsetX = 30;
          this.chartOptions.legend.position = 'bottom';
      
          this.chartOptions.xaxis.labels.style.fontSize = '12px';
  
        }
  }
  this.isFetching = true;
  this.fetch.getgraphData(2).subscribe({

    next: (data) => {
     
      this.graphData = data;

      this.isFetching = false;

      console.log('Data received:', this.graphData[0]);
      this.graphDataKeys = Object.keys(this.graphData[0]);
      this.graphDataValues = Object.values(this.graphData[0]);
     
      console.log('Data received:', this.graphDataKeys);
      console.log('Data received:', this.graphDataValues);
      this.catA = [...Object.keys(this.graphDataValues[0])];
      this.catB = [...Object.keys(this.graphDataValues[1])];
      this.chartOptions.xaxis.categories = this.catA.length>this.catB.length? this.catA : this.catB;
      console.log(this.chartOptions.xaxis.categories);
      this.chartOptions.series.forEach((p)=>{
        this.graphDataKeys.forEach((q,i)=>{
          if(p['name'] === q){
          p['data'] = [...Object.values(this.graphDataValues[i]) as number[]] ;

        }
      })
    })
    console.log(this.chartOptions.series);
    },
    error: (err) => {
      this.isFetching = true;
      console.error('GET request error:', err);
      this.errorDtls = 'Failed to load data';
    }
  });
    
  }


}
