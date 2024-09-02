import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-type-filtre',
  templateUrl: './type-filtre.component.html',
  styleUrls: ['./type-filtre.component.scss'],
})
export class TypeFiltreComponent {
  @Input() typeInput: 'credit' | 'debit' | undefined = undefined;
  @Output() applyEvent = new EventEmitter<any>();
  typeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.typeForm = this.formBuilder.group({
      type: [this.typeInput, [Validators.required]],
    });
  }

  apply() {
    const type = this.typeForm.get('type')?.value;
    this.applyEvent.emit({ type });
  }
}
