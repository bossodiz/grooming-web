import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TableService } from '@/app/services/table.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { PromotionTableList } from '@/app/services/model';
import { PromotionService } from '@/app/services/promotion.service';

@Component({
  selector: 'app-list',
  imports: [
    RouterModule,
    NgbPaginationModule,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    TranslateModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public tableService = inject(TableService);
  private promotionService = inject(PromotionService);

  searchCountries: PromotionTableList[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 5;
  records$: Observable<PromotionTableList[]> | undefined;
  total$: Observable<number> | undefined;

  ngOnInit(): void {
    this.records$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
    this.getData();
  }

  getData() {
    this.promotionService
      .getPromotion()
      .pipe(
        tap((response) => {
          this.searchCountries = response.data ?? [];
          this.tableService.setItems(this.searchCountries, this.pageSize);
          this.collectionSize = this.searchCountries.length;
          this.onSearch(); // เรียก onSearch() หลังจากอัปเดตข้อมูล
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  onSearch() {}

  openAddPromotion = () => {};
  viewDetail = (id: string) => {};
  deleteRecord = (id: string) => {};
}
