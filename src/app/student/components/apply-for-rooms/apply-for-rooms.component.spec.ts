import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForRoomsComponent } from './apply-for-rooms.component';

describe('ApplyForRoomsComponent', () => {
  let component: ApplyForRoomsComponent;
  let fixture: ComponentFixture<ApplyForRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyForRoomsComponent]
    });
    fixture = TestBed.createComponent(ApplyForRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
