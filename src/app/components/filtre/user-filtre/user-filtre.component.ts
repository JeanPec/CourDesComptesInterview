import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterInput } from '../filtre.component';

@Component({
  selector: 'app-user-filtre',
  templateUrl: './user-filtre.component.html',
  styleUrls: ['./user-filtre.component.scss']
})
export class UserFiltreComponent {
  @Input() nameFilter: FilterInput | undefined;
  @Output() applyEvent = new EventEmitter<any>();
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      prenom: [this.nameFilter?.value ?? '', [Validators.required]],
    });
  }

  apply() {
    const firstName = this.userForm.get('first')?.value;
    this.applyEvent.emit({ first: firstName});
  }

}
