import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterInput } from '../filtre.component';

@Component({
  selector: 'app-type-filtre',
  templateUrl: './type-filtre.component.html',
  styleUrls: ['./type-filtre.component.scss'],
})
export class TypeFiltreComponent {
  @Input() typeFilter: FilterInput = { type: 'type', value: {}};
  @Output() applyEvent = new EventEmitter<FilterInput>();
  typeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const typeInput = this.typeFilter.value.type;
    this.typeForm = this.formBuilder.group({
      type: [typeInput, [Validators.required]],
    });
  }

  apply() {
    const type = this.typeForm.get('type')?.value;
    this.applyEvent.emit({ type: this.typeFilter.type, value: { type } });
  }
}
