import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '@app/services/alert.service';
import { FilterInput } from '../filtre.component';

@Component({
  selector: 'app-date-filtre',
  templateUrl: './date-filtre.component.html',
  styleUrls: ['./date-filtre.component.scss']
})
export class DateFiltreComponent {
  @Input() dateFilter: FilterInput = { type: 'date', value: {} };
  @Output() applyEvent = new EventEmitter<any>();
  dateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const value = this.dateFilter.value;
    this.dateForm = this.formBuilder.group({
      beforeDate: [value.dateBefore, [Validators.required]],
      afterDate: [value.dateAfter, [Validators.required]],
    });
  }

  apply() {
    const dateBefore = this.dateForm.get('beforeDate')?.value;
    const dateAfter = this.dateForm.get('afterDate')?.value;
    if (new Date(dateAfter) < new Date(dateBefore)) {
      this.alertService.showAlert("Erreur date", "Vous ne pouvez pas sélectionnez une deuxième date plus récente que la première", 'error');
      return;
    }
    this.applyEvent.emit({type: this.dateFilter.type, value: { dateBefore, dateAfter }});
  }
}

