import { Component, Input } from '@angular/core';
import { FilterInput } from '@app/core/types/filter';
import {
  Direction,
  Sort,
  Transaction,
  TransactionsService,
} from '@app/services/transactions.service';
import { UsersService } from '@app/services/users.service';

const HEADER = [
  { key: 'type', text: 'Type' },
  { key: 'benefactor', text: 'Bénéficiaire' },
  { key: 'creditor', text: 'Créditeur' },
  { key: 'amount', text: 'Montant' },
  { key: 'date', text: 'Date' },
];

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
  activeFilters: FilterInput[] = [];
  loading = true;

  constructor(
    private transactionsService: TransactionsService,
    private userService: UsersService,
  ) {}

  private formatDataToTable(transactions: Transaction[]) {
    this.dataRows = transactions.map(
      ({ amount, fromUserId, toUserId, date }) => ({
        amount,
        isDebit: this.userId === toUserId,
        fromUser: this.userService.getUserFromId(fromUserId),
        toUser: this.userService.getUserFromId(toUserId),
        date,
      }),
    );
    this.loading = false;
  }

  ngOnInit() {
    this.getUserTransactions();
  }

  handleFilterUpdate(filters: FilterInput[]) {
    this.activeFilters = filters;
    this.getUserTransactions(true);
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

    this.getUserTransactions(true);
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

  async getUserTransactions(forceUpdate = false) {
    const data = await this.transactionsService.getUserTransactions(
      this.userId,
      this.currentPage,
      this.pageDisplay,
      this.activeSort,
      this.activeFilters,
      forceUpdate
    );
    this.totalItems = data.total;
    this.formatDataToTable(data.table);
    this.showPagination = this.totalItems > this.pageDisplay;
  }
}
