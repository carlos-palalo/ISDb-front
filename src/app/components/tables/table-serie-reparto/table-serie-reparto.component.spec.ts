import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSerieRepartoComponent } from './table-serie-reparto.component';

describe('TableSerieRepartoComponent', () => {
  let component: TableSerieRepartoComponent;
  let fixture: ComponentFixture<TableSerieRepartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSerieRepartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSerieRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
