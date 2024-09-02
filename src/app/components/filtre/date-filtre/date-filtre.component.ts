import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-date-filtre',
  templateUrl: './date-filtre.component.html',
  styleUrls: ['./date-filtre.component.scss']
})
export class DateFiltreComponent {
  @Input() dateBeforeInput: Date | undefined = undefined;
  @Input() dateAfterInput: Date | undefined = undefined;
  @Output() applyEvent = new EventEmitter<any>();
  dateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dateForm = this.formBuilder.group({
      beforeDate: [this.dateBeforeInput, [Validators.required]],
      afterDate: [this.dateAfterInput, [Validators.required]],
    });
  }

  apply() {
    const dateBefore = this.dateForm.get('beforeDate')?.value;
    const dateAfter = this.dateForm.get('afterDate')?.value;
    if (new Date(dateAfter) < new Date(dateBefore)) {
      this.alertService.showAlert("Erreur date", "Vous ne pouvez pas sélectionnez une deuxième date plus récente que la première", 'error');
      return;
    }
    this.applyEvent.emit({ dateBefore, dateAfter });
  }
}

