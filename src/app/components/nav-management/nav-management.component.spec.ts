import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavManagementComponent } from './nav-management.component';

describe('NavManagementComponent', () => {
  let component: NavManagementComponent;
  let fixture: ComponentFixture<NavManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
