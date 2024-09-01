import { Component, Input } from '@angular/core';
import {
  Direction,
  Sort,
  Transaction,
  TransactionsService,
} from '@app/services/transactions.service';

const HEADER = [{key: 'type', text: 'Type'},{key: 'amount', text: 'Montant'},{key: 'date', text: 'Date'}];

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent {
  @Input() userId: number = 0;
  dataHeader = HEADER;
  dataRows: any[] = [];
  currentPage = 0;
  totalItems = 0;
  pageDisplay = 5;
  showPagination = false;
  firstPage = true;
  lastPage = false;
  activeSort: Sort = { key: 'date', order: Direction.ASC };

  constructor(private transactionsService: TransactionsService) {}

  private formatDataToTable(transactions: Transaction[]) {
    this.dataRows = transactions.map(({ amount, toUserId, date }) => ({
      amount,
      isDebit: this.userId === toUserId,
      date,
    }));
  }

  ngOnInit() {
    this.getUserTransactions();
  }

  handleSort(header: string) {
    this.currentPage = 0;
    this.checkPageChange();
    if (this.activeSort.key === header) {
      this.activeSort.order =
        this.activeSort.order === Direction.ASC
          ? Direction.DESC
          : Direction.ASC;
    } else {
      this.activeSort = {
        key: header,
        order: Direction.ASC,
      };
    }

    this.getUserTransactions();
  }

  private checkPageChange() {
    if (this.currentPage === 0) this.firstPage = true;
    else this.firstPage = false;
    if ((this.currentPage + 1) * this.pageDisplay >= this.totalItems)
      this.lastPage = true;
    else this.lastPage = false;
  }

  handlePageChange(goNext: boolean) {
    if (goNext) {
      this.currentPage++;
    } else {
      if (this.currentPage > 0) this.currentPage--;
    }
    this.checkPageChange();
    this.getUserTransactions();
  }

  async getUserTransactions() {
    const data = await this.transactionsService.getUserTransactions(
      this.userId,
      this.currentPage,
      this.pageDisplay,
      this.activeSort,
    );
    this.totalItems = data.total;
    this.formatDataToTable(data.table);
    this.showPagination = this.totalItems > this.pageDisplay;
  }
}
