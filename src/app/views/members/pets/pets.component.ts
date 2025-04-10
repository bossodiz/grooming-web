import { LocaleService } from '@/app/services/locale.service';
import { PetTableList } from '@/app/services/model';
import { PetService } from '@/app/services/pet.service';
import { TableService } from '@/app/services/table.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-pets',
  imports: [
    RouterModule,
    NgbPaginationModule,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    NgbHighlight,
    TranslateModule,
  ],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent {
  public tableService = inject(TableService);
  private pipe = inject(DecimalPipe);
  private petService = inject(PetService);
  public translate = inject(TranslateService);
  private router = inject(Router);
  private localeService = inject(LocaleService);

  filter = '';
  page = 1;
  pageSize = 5;
  searchCountries!: PetTableList[];
  collectionSize = 0;
  originalData!: PetTableList[];
  records$: Observable<PetTableList[]> | undefined;
  total$: Observable<number> | undefined;
  locale = this.localeService.getLocale();

  ngOnInit(): void {
    this.records$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
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

  search(text: string, pipe: PipeTransform): PetTableList[] {
    if (text.length == 0) {
      return this.originalData;
    }
    return this.originalData.filter((item) => {
      const term = text.toLowerCase();
      return (
        (item.name ?? '').toLowerCase().includes(term) ||
        (item.name ?? '').includes(term) ||
        (item.genderTh ?? '').toLowerCase().includes(term) ||
        (item.genderTh ?? '').includes(term) ||
        (item.genderEn ?? '').toLowerCase().includes(term) ||
        (item.genderEn ?? '').includes(term) ||
        (item.breedNameTh ?? '').toLowerCase().includes(term) ||
        (item.breedNameTh ?? '').includes(term) ||
        (item.breedNameEn ?? '').toLowerCase().includes(term) ||
        (item.breedNameEn ?? '').includes(term) ||
        (item.typeNameTh ?? '').toLowerCase().includes(term) ||
        (item.typeNameTh ?? '').includes(term) ||
        (item.typeNameEn ?? '').toLowerCase().includes(term) ||
        (item.typeNameEn ?? '').includes(term)
      );
    });
  }

  getData() {
    this.petService
      .getPetList()
      .pipe(
        tap((response) => {
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

  viewDetail(itemId: number) {
    this.router.navigate(['/member/pets/detail', itemId]);
  }
}
