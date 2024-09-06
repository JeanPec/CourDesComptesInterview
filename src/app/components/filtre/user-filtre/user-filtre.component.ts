import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterInput } from '@app/core/types/filter';

@Component({
  selector: 'app-user-filtre',
  templateUrl: './user-filtre.component.html',
  styleUrls: ['./user-filtre.component.scss'],
})
export class UserFiltreComponent {
  @Input() userFilter: FilterInput = { type: 'creditor', value: {} };
  @Output() applyEvent = new EventEmitter<any>();
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const name = this.userFilter.value.first;
    this.userForm = this.formBuilder.group({
      first: [name ?? '', [Validators.required]],
    });
  }

  apply() {
    const firstName = this.userForm.get('first')?.value;
    this.applyEvent.emit({
      type: this.userFilter.type,
      value: { first: firstName },
    });
  }
}
