import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSerieGeneroComponent } from './table-serie-genero.component';

describe('TableSerieGeneroComponent', () => {
  let component: TableSerieGeneroComponent;
  let fixture: ComponentFixture<TableSerieGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSerieGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSerieGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
