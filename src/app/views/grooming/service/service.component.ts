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
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, tap, throwError } from 'rxjs';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GroomingServiceTableList } from '@/app/services/model';
import { GroomingService } from '@/app/services/grooming.service';
import { MultiHighlightPipe } from '../../../services/format.service';
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
  filter = '';
  searchCountries!: GroomingServiceTableList[];
  originalData!: GroomingServiceTableList[];

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
  typeError!: string;
  priceError!: string;
  petTypeList: any[] = [];
  locale = this.localeService.getLocale();
  btnSave!: string;
  headerModal!: string;
  isDelete!: boolean;

  ngOnInit(): void {
    this.getData();
    this.loadPetTypes();
  }

  onSearch() {
    let searchData = this.search(this.filter, this.pipe);
    this.searchCountries = searchData.map((country: any) => ({
      ...country,
    }));
  }

  search(text: string, pipe: PipeTransform): GroomingServiceTableList[] {
    if (!text || text.trim().length === 0) {
      return this.originalData;
    }

    const terms = text
      .toLowerCase()
      .split('|')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    return this.originalData.filter((item) => {
      const searchable = [
        item.name ?? '',
        item.description ?? '',
        item.type ?? '',
      ].map((v) => v.toLowerCase());

      // ทุกคำต้องเจอในอย่างน้อย 1 ฟิลด์
      return terms.every((term) =>
        searchable.some((field) => field.includes(term)),
      );
    });
  }

  getData() {
    this.groomingService
      .getService()
      .pipe(
        tap((response) => {
          this.originalData = response.data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
              type: item.typeName,
              description: item.description,
            } as GroomingServiceTableList;
          });
          this.onSearch();
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
          name: [service.name, [Validators.required]],
          price: [service.price],
          type: [service.type],
          description: [service.description],
          barcode: [service.barcode],
          remark: [service.remark],
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
  openAddServiceModal() {
    this.serviceForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      description: [null],
      type: [null],
      price: [null],
      barcode: [null],
      remark: [null],
    });
    this.btnSave = this.translate.instant('add');
    this.headerModal = this.translate.instant('add_service');
    this.isDelete = false;
    this.modalService.open(this.standardModal, { centered: true });
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
      this.typeError = this.translate.instant('error.require.pet_type');
      this.priceError = this.translate.instant('error.require.service_price');
      if (this.form['name'].errors) {
        this.serviceForm.markAllAsTouched(); // เพื่อแสดง validation error
        return;
      }
    }
    const formData = {
      id: this.serviceForm.get('id')?.value,
      name: this.serviceForm.get('name')?.value,
      price: this.serviceForm.get('price')?.value,
      type: this.serviceForm.get('type')?.value,
      description: this.serviceForm.get('description')?.value,
      barcode: this.serviceForm.get('barcode')?.value,
      remark: this.serviceForm.get('remark')?.value,
    };
    this.groomingService
      .addService(formData)
      .pipe(
        tap((response) => {
          this.getData();
          this.modalclose();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  deleteService() {
    this.groomingService
      .deleteService(this.serviceForm.value.id)
      .pipe(
        tap((response) => {
          this.getData();
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
}
