import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFiltreComponent } from './date-filtre.component';

describe('DateFiltreComponent', () => {
  let component: DateFiltreComponent;
  let fixture: ComponentFixture<DateFiltreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateFiltreComponent]
    });
    fixture = TestBed.createComponent(DateFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
