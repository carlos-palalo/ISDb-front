import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepartoComponent } from './list-reparto.component';

describe('ListRepartoComponent', () => {
  let component: ListRepartoComponent;
  let fixture: ComponentFixture<ListRepartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
