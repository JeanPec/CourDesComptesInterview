import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountFiltreComponent } from './amount-filtre.component';

describe('AmountFiltreComponent', () => {
  let component: AmountFiltreComponent;
  let fixture: ComponentFixture<AmountFiltreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountFiltreComponent]
    });
    fixture = TestBed.createComponent(AmountFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
