import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  inject,
  TemplateRef,
  ViewChild,
  type PipeTransform,
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  NgbHighlight,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { TableService } from '@/app/services/table.service';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GroomingServiceTableList } from '@/app/services/model';
import { GroomingService } from '@/app/services/grooming.service';
import { MultiHighlightPipe } from '../../../services/format.service';
import { PetService } from '@/app/services/pet.service';
import { MasterService } from '@/app/services/master.service';
import { LocaleService } from '@/app/services/locale.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, NGX_MASK_CONFIG, initialConfig } from 'ngx-mask';

@Component({
  selector: 'app-service',
  imports: [
    RouterModule,
    NgbPaginationModule,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    TranslateModule,
    MultiHighlightPipe,
    NgSelectModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
  providers: [
    {
      provide: NGX_MASK_CONFIG,
      useValue: initialConfig,
    },
  ],
})
export class ServiceComponent {
  //Dog
  filterDog = '';
  pageDog = 1;
  pageSizeDog = 5;
  searchCountriesDog!: GroomingServiceTableList[];
  collectionSizeDog = 0;
  originalDataDog!: GroomingServiceTableList[];

  //Cat
  filterCat = '';
  pageCat = 1;
  pageSizeCat = 5;
  searchCountriesCat!: GroomingServiceTableList[];
  collectionSizeCat = 0;
  originalDataCat!: GroomingServiceTableList[];

  records$: Observable<GroomingServiceTableList[]> | undefined;
  total$: Observable<number> | undefined;
  public tableService = inject(TableService);
  private pipe = inject(DecimalPipe);
  private groomingService = inject(GroomingService);
  private masterService = inject(MasterService);
  translate = inject(TranslateService);
  public formBuilder = inject(UntypedFormBuilder);
  private modalService = inject(NgbModal);
  private localeService = inject(LocaleService);
  @ViewChild('standardModal') standardModal!: TemplateRef<any>;

  // Modal
  serviceForm!: UntypedFormGroup;
  submit!: boolean;
  nameError!: string;
  petTypeList: any[] = [];
  locale = this.localeService.getLocale();
  btnSave!: string;
  headerModal!: string;
  isDelete!: boolean;

  ngOnInit(): void {
    this.records$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
    this.getData('dog');
    this.getData('cat');
    this.loadPetTypes();
  }

  onSearch(type: string) {
    if (type === 'dog') {
      let searchData = this.search(type, this.filterDog, this.pipe);
      this.collectionSizeDog = searchData.length;
      this.searchCountriesDog = searchData
        .map((country: any) => ({
          ...country,
        }))
        .slice(
          (this.pageDog - 1) * this.pageSizeDog,
          (this.pageDog - 1) * this.pageSizeDog + this.pageSizeDog,
        );
    } else {
      let searchDataCat = this.search(type, this.filterCat, this.pipe);
      this.collectionSizeCat = searchDataCat.length;
      this.searchCountriesCat = searchDataCat
        .map((country: any) => ({
          ...country,
        }))
        .slice(
          (this.pageCat - 1) * this.pageSizeCat,
          (this.pageCat - 1) * this.pageSizeCat + this.pageSizeCat,
        );
    }
  }

  search(
    type: string,
    text: string,
    pipe: PipeTransform,
  ): GroomingServiceTableList[] {
    if (!text || text.trim().length === 0) {
      if (type === 'dog') {
        return this.originalDataDog;
      } else {
        return this.originalDataCat;
      }
    }

    const terms = text
      .toLowerCase()
      .split('|')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (type === 'dog') {
      return this.originalDataDog.filter((item) => {
        const searchable = [
          item.service_name ?? '',
          item.type ?? '',
          item.details ?? '',
        ].map((v) => v.toLowerCase());

        // ทุกคำต้องเจอในอย่างน้อย 1 ฟิลด์
        return terms.every((term) =>
          searchable.some((field) => field.includes(term)),
        );
      });
    } else {
      return this.originalDataCat.filter((item) => {
        const searchable = [
          item.service_name ?? '',
          item.type ?? '',
          item.details ?? '',
        ].map((v) => v.toLowerCase());

        // ทุกคำต้องเจอในอย่างน้อย 1 ฟิลด์
        return terms.every((term) =>
          searchable.some((field) => field.includes(term)),
        );
      });
    }
  }

  getData(type: string) {
    this.groomingService
      .getService(type)
      .pipe(
        tap((response) => {
          if (type === 'dog') {
            this.originalDataDog = response.data.map((item: any) => {
              return {
                id: item.id,
                service_name: item.nameTh, // หรือ nameEn แล้วแต่ภาษา
                type: item.typeTh,
                service_price: item.price,
                details: item.remark,
              } as GroomingServiceTableList;
            });
            this.tableService.setItems(this.originalDataDog, this.pageSizeDog);
            this.collectionSizeDog = this.originalDataDog.length;
            this.onSearch(type);
          } else {
            this.originalDataCat = response.data.map((item: any) => {
              return {
                id: item.id,
                service_name: item.nameTh, // หรือ nameEn แล้วแต่ภาษา
                type: item.typeTh,
                service_price: item.price,
                details: item.remark,
              } as GroomingServiceTableList;
            });
            this.tableService.setItems(this.originalDataCat, this.pageSizeCat);
            this.collectionSizeCat = this.originalDataCat.length;
            this.onSearch(type);
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
  viewDetail(id: number) {
    this.groomingService.getServiceById(id).subscribe({
      next: (response) => {
        const service = response.data;
        this.serviceForm = this.formBuilder.group({
          id: [service.id],
          nameTh: [service.nameTh, [Validators.required]],
          nameEn: [service.nameEn],
          price: [service.price],
          remark: [service.remark],
          type: [service.typeId],
        });
        this.form['type']?.disable();
        this.btnSave = this.translate.instant('save');
        this.headerModal = this.translate.instant('detail');
        this.isDelete = true;
        this.modalService.open(this.standardModal, { centered: true });
      },
      error: (error) => {
        console.error('Error fetching service details:', error);
      },
    });
  }
  openAddServiceModal(type: string) {
    this.masterService
      .getPetTypeByName(type)
      .pipe(
        tap((response) => {
          let petTypeId = response.data.key; // เก็บ id ของ pet type ที่เลือก
          this.serviceForm = this.formBuilder.group({
            id: [null],
            nameTh: ['', [Validators.required]],
            nameEn: [null],
            price: [null],
            remark: [null],
            type: [petTypeId],
          });
          this.form['type']?.disable();
          this.btnSave = this.translate.instant('add');
          this.headerModal = this.translate.instant('add_service');
          this.isDelete = false;
          this.modalService.open(this.standardModal, { centered: true });
        }),
      )
      .subscribe();
  }

  modalclose() {
    this.modalService.dismissAll();
    this.serviceForm.reset();
    this.submit = false;
  }

  get form() {
    return this.serviceForm.controls;
  }

  addService() {
    this.submit = true;
    if (this.serviceForm.invalid) {
      this.nameError = this.translate.instant('error.require.service_name');
      this.serviceForm.markAllAsTouched(); // เพื่อแสดง validation error
      return;
    }
    const formData = {
      id: this.serviceForm.get('id')?.value,
      nameTh: this.serviceForm.get('nameTh')?.value,
      nameEn: this.serviceForm.get('nameEn')?.value,
      price: this.serviceForm.get('price')?.value,
      remark: this.serviceForm.get('remark')?.value,
      petTypeId: this.serviceForm.get('type')?.value,
    };
    this.groomingService
      .addService(formData)
      .pipe(
        tap((response) => {
          this.getData('dog');
          this.getData('cat');
          this.modalclose();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  loadPetTypes() {
    this.masterService
      .getPetTypes()
      .pipe(
        tap((response) => {
          this.petTypeList = response.data ?? [];
          this.sortPetTypes();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  sortPetTypes() {
    this.petTypeList
      .sort((a, b) =>
        this.locale() === 'th'
          ? a.value_th.localeCompare(b.value_th)
          : a.value_en.localeCompare(b.value_en),
      )
      .map((item) => {
        item.label = this.locale() === 'th' ? item.value_th : item.value_en;
      });
  }

  deleteService() {
    this.groomingService
      .deleteService(this.serviceForm.value.id)
      .pipe(
        tap((response) => {
          this.getData('dog');
          this.getData('cat');
          this.modalclose();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
