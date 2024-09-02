import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-amount-filtre',
  templateUrl: './amount-filtre.component.html',
  styleUrls: ['./amount-filtre.component.scss'],
})
export class AmountFiltreComponent {
  @Input() lowerAmount: number | undefined = undefined;
  @Input() upperAmount: number | undefined = undefined;
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
    this.amountForm = this.formBuilder.group({
      lowerAmount: [this.lowerAmount, [Validators.required, Validators.min(0)]],
      upperAmount: [this.upperAmount, [Validators.required, Validators.min(0)]],
    });
  }

  apply() {
    const lowerAmount = this.amountForm.get('lowerAmount')?.value;
    const upperAmount = this.amountForm.get('upperAmount')?.value;
    if (upperAmount < lowerAmount) {
      this.alertService.showAlert(
        'Erreur date',
        'Vous ne pouvez pas sélectionnez une deuxième solde inféireur à la première',
        'error',
      );
      return;
    }
    this.applyEvent.emit({ lowerAmount, upperAmount });
  }
}
