import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitySFComponent } from './opportunity-sf.component';

describe('OpportunitySFComponent', () => {
  let component: OpportunitySFComponent;
  let fixture: ComponentFixture<OpportunitySFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitySFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitySFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
