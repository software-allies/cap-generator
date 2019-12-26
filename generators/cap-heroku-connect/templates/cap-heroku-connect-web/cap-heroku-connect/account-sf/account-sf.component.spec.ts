import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSFComponent } from './account-sf.component';

describe('AccountSFComponent', () => {
  let component: AccountSFComponent;
  let fixture: ComponentFixture<AccountSFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
