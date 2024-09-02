import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFiltreComponent } from './user-filtre.component';

describe('UserFiltreComponent', () => {
  let component: UserFiltreComponent;
  let fixture: ComponentFixture<UserFiltreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFiltreComponent]
    });
    fixture = TestBed.createComponent(UserFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
