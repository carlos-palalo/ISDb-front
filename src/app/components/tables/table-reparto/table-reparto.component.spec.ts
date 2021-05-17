import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRepartoComponent } from './table-reparto.component';

describe('TableRepartoComponent', () => {
  let component: TableRepartoComponent;
  let fixture: ComponentFixture<TableRepartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRepartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
