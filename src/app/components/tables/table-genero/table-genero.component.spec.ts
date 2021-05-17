import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGeneroComponent } from './table-genero.component';

describe('TableGeneroComponent', () => {
  let component: TableGeneroComponent;
  let fixture: ComponentFixture<TableGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
