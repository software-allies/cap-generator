import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSFComponent } from './lead-sf.component';

describe('LeadSFComponent', () => {
  let component: LeadSFComponent;
  let fixture: ComponentFixture<LeadSFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadSFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
