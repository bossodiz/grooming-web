import {
  Response,
  CustomerTableList,
  MemberService,
} from '@/app/services/member.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChildren,
  type PipeTransform,
  type QueryList,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { TableService } from '@/app/services/table.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-datatable',
  imports: [
    RouterModule,
    NgbPaginationModule,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    NgbHighlight,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  styles: ``,
})
export class CustomersComponent {
  filter = '';
  page = 1;
  pageSize = 5;
  searchCountries!: CustomerTableList[];
  collectionSize = 0;

  originalData!: CustomerTableList[];

  records$: Observable<CustomerTableList[]>;
  total$: Observable<number>;

  public tableService = inject(TableService<CustomerTableList>);

  constructor(
    public pipe: DecimalPipe,
    private memberService: MemberService,
  ) {
    this.records$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.getData();
  }

  onSearch() {
    let searchData = this.search(this.filter, this.pipe);
    this.collectionSize = searchData.length;
    this.searchCountries = searchData
      .map((country: any) => ({
        ...country,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
  }

  search(text: string, pipe: PipeTransform): CustomerTableList[] {
    if (text.length == 0) {
      return this.originalData;
    }
    return this.originalData.filter((item) => {
      const term = text.toLowerCase();
      return (
        (item.phone ?? '').includes(term) ||
        (item.name ?? '').toLowerCase().includes(term) ||
        (item.name ?? '').includes(term) ||
        (item.firstname ?? '').toLowerCase().includes(term) ||
        (item.firstname ?? '').includes(term) ||
        (item.lastname ?? '').toLowerCase().includes(term) ||
        (item.lastname ?? '').includes(term)
      );
    });
  }

  getData() {
    this.memberService
      .getCustomers()
      .pipe(
        tap((response: Response<CustomerTableList>) => {
          this.originalData = response.data ?? [];
          this.tableService.setItems(this.originalData, this.pageSize);
          this.collectionSize = this.originalData.length;
          this.onSearch(); // เรียก onSearch() หลังจากอัปเดตข้อมูล
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
