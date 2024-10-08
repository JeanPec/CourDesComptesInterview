import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertPayload, AlertService } from '@app/services/alert.service';
import { AuthService, UserInfo } from '@app/services/auth.service';
import { TransactionsService } from '@app/services/transactions.service';
import { UsersService } from '@app/services/users.service';
import { DsfrModalComponent } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent {
  @ViewChild('confirmationModal') dialog!: DsfrModalComponent;
  newTransactionForm!: FormGroup;
  user: UserInfo | undefined;
  userAmount: number = 0;
  amountToConfirm: number = 0;
  emailToConfirm: string = '';
  receiverIdToConfirm: number = 0;
  actions: any[] = [];
  alert: AlertPayload | null = null;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private transactionsService: TransactionsService,
  ) {}
  async ngOnInit(): Promise<void> {
    this.initForm();
    this.user = this.authService.WhoAmI();
    this.userAmount = await this.transactionsService.updatedSum(
      this.user.id,
      this.user.initial_balance,
    );
    this.actions = [
      {
        label: 'Confirmez',
        icon: 'fr-icon-checkbox-circle-line',
        // bind the context so that we can access to the info of the main class
        callback: this.handleModelAction.bind(this),
      },
    ];
  }

  initForm() {
    this.newTransactionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  handleModelAction() {
    if (this.user) {
      this.transactionsService
        .submitTransaction(
          this.user.id,
          this.amountToConfirm,
          this.receiverIdToConfirm,
        )
        .subscribe({
          next: () => {
            this.alertService.showAlert(
              'Transaction confirmée',
              'La transaction a bien été crée',
              'success',
            );
            this.newTransactionForm.reset();
          },
          error: (error) => {
            this.alertService.showAlert(
              'Erreur Appel Transaction',
              'Une erreur réseau est arrivé' + error.error,
              'error',
            );
          },
        });
    }
  }

  closeAlert() {
    this.alert = null;
  }

  submit() {
    const email = this.newTransactionForm.get('email')?.value;
    const amount = this.newTransactionForm.get('amount')?.value * 100;

    if (amount > this.userAmount) {
      this.alert = {
        heading: 'Solde insuffisante',
        message: 'Solde insuffisante pour le transfert',
        severity: 'warning',
        closeControlLabel: 'Fermez',
      };
      return;
    }

    const receiver = this.usersService.getUserIdFromEmail(email);
    if (receiver === undefined) {
      this.alert = {
        heading: 'Erreur email',
        message:
          "L'email rentré n'existe pas veuillez en sélectionner un autre",
        severity: 'error',
        closeControlLabel: 'Fermez',
      };
      return;
    }
    this.emailToConfirm = email;
    this.receiverIdToConfirm = receiver.id;
    this.amountToConfirm = amount;

    this.dialog.open();
  }
}
