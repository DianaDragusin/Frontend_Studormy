import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentlistComponent } from './addstudentlist.component';

describe('AddstudentlistComponent', () => {
  let component: AddstudentlistComponent;
  let fixture: ComponentFixture<AddstudentlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstudentlistComponent]
    });
    fixture = TestBed.createComponent(AddstudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
