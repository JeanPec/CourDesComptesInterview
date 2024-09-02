import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFiltreComponent } from './type-filtre.component';

describe('TypeFiltreComponent', () => {
  let component: TypeFiltreComponent;
  let fixture: ComponentFixture<TypeFiltreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeFiltreComponent]
    });
    fixture = TestBed.createComponent(TypeFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
