import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/services/alert.service';
import { FilterInput } from '../filtre.component';

@Component({
  selector: 'app-amount-filtre',
  templateUrl: './amount-filtre.component.html',
  styleUrls: ['./amount-filtre.component.scss'],
})
export class AmountFiltreComponent {
  @Input() amountFilter: FilterInput = { type: 'amount', value: {} };
  @Output() applyEvent = new EventEmitter<any>();
  amountForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const value = this.amountFilter.value;
    this.amountForm = this.formBuilder.group({
      lowerAmount: [value.lowerAmount ?? 0, [Validators.required, Validators.min(0), Validators.pattern('[0-9]*,[0-9]{0,2}')]],
      upperAmount: [value.upperAmount ?? 50000, [Validators.required, Validators.min(0), Validators.pattern('[0-9]*,[0-9]{0,2}')]],
    });
  }

  apply() {
    const lowerAmount = this.amountForm.get('lowerAmount')?.value * 100;
    const upperAmount = this.amountForm.get('upperAmount')?.value * 100;
    if (upperAmount < lowerAmount) {
      this.alertService.showAlert(
        'Erreur date',
        'Vous ne pouvez pas sélectionnez une deuxième solde inféireur à la première',
        'error',
      );
      return;
    }
    this.applyEvent.emit({type: this.amountFilter.type, value: { lowerAmount, upperAmount }});
  }
}
