import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorHandlingComponent } from './form-error-handling.component';

describe('FormErrorHandlingComponent', () => {
  let component: FormErrorHandlingComponent;
  let fixture: ComponentFixture<FormErrorHandlingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorHandlingComponent]
    });
    fixture = TestBed.createComponent(FormErrorHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
