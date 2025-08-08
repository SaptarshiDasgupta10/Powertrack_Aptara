import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datatables3Component } from './datatables3.component';

describe('Datatables3Component', () => {
  let component: Datatables3Component;
  let fixture: ComponentFixture<Datatables3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datatables3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datatables3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
