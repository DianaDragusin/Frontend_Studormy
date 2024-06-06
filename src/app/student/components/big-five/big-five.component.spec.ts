import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigFiveComponent } from './big-five.component';

describe('BigFiveComponent', () => {
  let component: BigFiveComponent;
  let fixture: ComponentFixture<BigFiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BigFiveComponent]
    });
    fixture = TestBed.createComponent(BigFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
