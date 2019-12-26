import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSFComponent } from './contact-sf.component';

describe('ContactSFComponent', () => {
  let component: ContactSFComponent;
  let fixture: ComponentFixture<ContactSFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
