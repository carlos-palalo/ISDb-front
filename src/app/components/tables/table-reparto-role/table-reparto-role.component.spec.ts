import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRepartoRoleComponent } from './table-reparto-role.component';

describe('TableRepartoRoleComponent', () => {
  let component: TableRepartoRoleComponent;
  let fixture: ComponentFixture<TableRepartoRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRepartoRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRepartoRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
