import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRenderComponent } from './link-render.component';

describe('LinkRenderComponent', () => {
  let component: LinkRenderComponent;
  let fixture: ComponentFixture<LinkRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkRenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
