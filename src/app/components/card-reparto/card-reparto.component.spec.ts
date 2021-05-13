import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRepartoComponent } from './card-reparto.component';

describe('CardRepartoComponent', () => {
  let component: CardRepartoComponent;
  let fixture: ComponentFixture<CardRepartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRepartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
