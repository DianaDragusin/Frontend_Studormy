import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRoomsAvailableComponent } from './see-rooms-available.component';

describe('SeeRoomsAvailableComponent', () => {
  let component: SeeRoomsAvailableComponent;
  let fixture: ComponentFixture<SeeRoomsAvailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeRoomsAvailableComponent]
    });
    fixture = TestBed.createComponent(SeeRoomsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
