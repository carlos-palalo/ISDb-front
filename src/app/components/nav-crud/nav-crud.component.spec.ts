import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCrudComponent } from './nav-crud.component';

describe('NavCrudComponent', () => {
  let component: NavCrudComponent;
  let fixture: ComponentFixture<NavCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
