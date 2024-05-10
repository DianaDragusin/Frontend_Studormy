import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocationSettingsComponent } from './room-allocation-settings.component';

describe('RoomAllocationSettingsComponent', () => {
  let component: RoomAllocationSettingsComponent;
  let fixture: ComponentFixture<RoomAllocationSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomAllocationSettingsComponent]
    });
    fixture = TestBed.createComponent(RoomAllocationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
