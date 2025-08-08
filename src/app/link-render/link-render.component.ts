import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-link-render',
  templateUrl: './link-render.component.html',
  styleUrl: './link-render.component.css'
})
export class LinkRenderComponent implements ICellRendererAngularComp  {
    journalName!: string;

  agInit(params: any): void {
    this.journalName = params.value;
  }

  refresh(): boolean {
    return false;
  }
}


