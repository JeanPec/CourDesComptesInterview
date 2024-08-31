import { Component, Input } from '@angular/core';
import {
  Transaction,
  TransactionsService,
} from '@app/services/transactions.service';
import { DsfrDataTable, DsfrTableColumn } from '@edugouvfr/ngx-dsfr';

const HEADER = [{key: 'amount', heading: 'Montant'}, {key: 'type', heading: 'Type'}, {key: 'date', heading: 'Date'}];
enum TRANSACTION_TYPE {
  DEBIT = 'Débit',
  CREDIT = 'Crédit'
};

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent {
  @Input() userId: number = 0;
  dataHeader: DsfrTableColumn[] = HEADER;
  dataRows: any[] = []

  constructor(private transactionsService: TransactionsService) {}

  private formatDataToTable(transactions: Transaction[]) {
    this.dataRows = transactions.map(({ amount, toUserId, date}) => ({
      amount,
      type: this.userId === toUserId ? TRANSACTION_TYPE.CREDIT : TRANSACTION_TYPE.DEBIT,
      date
    }))
  }

  async ngOnInit() {
    const transactions = await this.transactionsService
    .getUserTransactions(this.userId);
    this.formatDataToTable(transactions);
  }
}
