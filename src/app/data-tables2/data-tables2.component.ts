import { Component, OnInit } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';




@Component({
  selector: 'app-data-tables2',
  templateUrl: './data-tables2.component.html',
  styleUrl: './data-tables2.component.css'
})
export class DataTables2Component implements OnInit {
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];
ngOnInit(): void {
}

// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
];
defaultColDef: ColDef = {
  flex: 1,
};


}
