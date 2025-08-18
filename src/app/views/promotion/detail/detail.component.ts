import { PromotionDetail, PromotionItem } from '@/app/services/model';
import { PromotionService } from '@/app/services/promotion.service';
import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Options } from 'flatpickr/dist/types/options';
import { Thai } from 'flatpickr/dist/l10n/th';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { FlatpickrDirective } from '@common/flatpickr.directive';

type Unit = 'BAHT' | 'PERCENT';

@Component({
  selector: 'app-detail',
  imports: [
    BreadcrumbComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FlatpickrDirective,
    NgbDropdownModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  private router = inject(Router);
  private promotionService = inject(PromotionService);
  private route = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  public formBuilder = inject(UntypedFormBuilder);
  private fb = inject(FormBuilder);

  promotionId: string | null = null;

  submit!: boolean;

  promotionForm!: UntypedFormGroup;

  dayList: any[] = [
    { key: 'MON', label: 'Monday' },
    { key: 'TUE', label: 'Tuesday' },
    { key: 'WED', label: 'Wednesday' },
    { key: 'THU', label: 'Thursday' },
    { key: 'FRI', label: 'Friday' },
    { key: 'SAT', label: 'Saturday' },
    { key: 'SUN', label: 'Sunday' },
  ];

  get form() {
    return this.promotionForm.controls;
  }
  readonly min = 0;
  unit = signal<Unit>('BAHT');
  formAmount = this.fb.group({
    amount: [
      null as number | null,
      [Validators.required, Validators.min(this.min)],
    ],
  });

  max = computed(() => (this.unit() === 'PERCENT' ? 100 : null));
  unitLabel = computed(() => (this.unit() === 'BAHT' ? 'บาท' : '%'));

  setUnit(next: Unit) {
    if (this.unit() !== next) {
      this.unit.set(next);
      const ctrl = this.formAmount.controls.amount;
      if (next === 'PERCENT' && ctrl.value != null && ctrl.value > 100) {
        ctrl.setValue(100);
      }
    }
  }

  flatpickrStartOptions: Options = {
    locale: Thai,
    altInput: true,
    altFormat: 'D d M Y | H:i',
    dateFormat: 'Y-m-d\\TH:i:S',
    enableTime: true,
    time_24hr: true,
    minTime: '09:00',
    maxTime: '19:00',
    plugins: [
      confirmDatePlugin({
        confirmIcon: '', // เปลี่ยน icon
        confirmText: 'ตกลง', // เปลี่ยนข้อความปุ่ม
        showAlways: true, // แสดงปุ่มเฉพาะตอนเปิด popup
        theme: 'light', // หรือ dark
      }),
    ],

    onOpen: [
      (selectedDates, dateStr, instance) => {
        const currentValue = this.promotionForm.get('start_date')?.value;
        if (!currentValue) {
          const now = new Date();
          instance.setDate(now, true);
        }
      },
    ],

    onReady: (selectedDates, dateStr, instance) => {
      const currentValueStart = this.promotionForm.get('start_date')?.value;
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
      if (currentValueStart) {
        instance.setDate(currentValueStart, true);
        instance.set('minDate', currentValueStart);
      } else {
        instance.set('minDate', todayStr);
      }
      setTimeout(() => {
        const confirmBtns = document.querySelectorAll(
          '.flatpickr-confirm',
        ) as NodeListOf<HTMLElement>;
        confirmBtns.forEach((btn) => {
          btn.style.cursor = 'pointer';
          btn.style.backgroundColor = '#f8d7da';
          btn.style.color = '#721c24';
          btn.style.padding = '8px 16px';
          btn.style.borderRadius = '12px';
          btn.style.fontSize = '14px';
          btn.style.fontWeight = 'bold';
          btn.style.margin = '8px auto 4px';
          btn.style.display = 'block';
          btn.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          btn.innerHTML = 'ยืนยัน';
          btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#f5c6cb';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '#f8d7da';
          });
        });
      }, 0);
    },
  };

  flatpickrEndOptions: Options = {
    locale: Thai,
    altInput: true,
    altFormat: 'D d M Y | H:i',
    dateFormat: 'Y-m-d\\TH:i:S',
    enableTime: true,
    time_24hr: true,
    minTime: '09:00',
    maxTime: '19:00',
    plugins: [
      confirmDatePlugin({
        confirmIcon: '', // เปลี่ยน icon
        confirmText: 'ตกลง', // เปลี่ยนข้อความปุ่ม
        showAlways: true, // แสดงปุ่มเฉพาะตอนเปิด popup
        theme: 'light', // หรือ dark
      }),
    ],

    onOpen: [
      (selectedDates, dateStr, instance) => {
        const inputId = (instance.input as HTMLInputElement).id;
        if (inputId === 'datetime-datepicker-start') {
          const currentValue = this.promotionForm.get('start_date')?.value;
          if (!currentValue) {
            const now = new Date();
            instance.setDate(now, true);
          }
        }
        if (inputId === 'datetime-datepicker-end') {
          const currentValue = this.promotionForm.get('end_date')?.value;
          if (!currentValue) {
            const now = new Date();
            instance.setDate(now, true);
          }
        }
      },
    ],

    onReady: (selectedDates, dateStr, instance) => {
      const inputId = (instance.input as HTMLInputElement).id;
      const currentValueStart = this.promotionForm.get('start_date')?.value;
      const currentValueEnd = this.promotionForm.get('end_date')?.value;
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
      if (inputId === 'datetime-datepicker-start') {
        if (currentValueStart) {
          instance.setDate(currentValueStart, true);
          instance.set('minDate', currentValueStart);
        } else {
          instance.set('minDate', todayStr);
        }
      }
      if (inputId === 'datetime-datepicker-end') {
        if (currentValueEnd) {
          instance.setDate(currentValueEnd, true);
          instance.set('minDate', currentValueEnd);
        } else {
          if (currentValueStart) {
            instance.set('minDate', currentValueStart);
          } else {
            instance.set('minDate', todayStr);
          }
        }
      }
      setTimeout(() => {
        const confirmBtns = document.querySelectorAll(
          '.flatpickr-confirm',
        ) as NodeListOf<HTMLElement>;
        confirmBtns.forEach((btn) => {
          btn.style.cursor = 'pointer';
          btn.style.backgroundColor = '#f8d7da';
          btn.style.color = '#721c24';
          btn.style.padding = '8px 16px';
          btn.style.borderRadius = '12px';
          btn.style.fontSize = '14px';
          btn.style.fontWeight = 'bold';
          btn.style.margin = '8px auto 4px';
          btn.style.display = 'block';
          btn.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          btn.innerHTML = 'ยืนยัน';
          btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#f5c6cb';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '#f8d7da';
          });
        });
      }, 0);
    },
  };

  includedItemStatus = false;
  excludedItemStatus = false;

  ngOnInit(): void {
    this.promotionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      discount_category: ['', [Validators.required]],
      discount_type: ['', [Validators.required]],
      amount_type: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      period_type: ['', [Validators.required]],
      start_date: [''],
      end_date: [''],
      specific_days: [''],
      customer_only: [false],
      status: [false],
      quota: [null],
      quotaRadio: [''],
      created_at: [''],
      updated_at: [''],
      condition: [''],
      condition_value: [''],
    });
    this.route.paramMap.subscribe((params) => {
      this.promotionId = params.get('id');
      if (this.promotionId) {
        this.getData();
      }
    });
  }

  getData() {
    if (!this.promotionId) {
      return;
    }
    this.promotionService
      .getPromotionById(this.promotionId)
      .pipe(
        tap((response) => {
          this.promotionForm.patchValue({
            name: response.data.name ?? '',
            discount_category: response.data.discountCategory ?? '',
            discount_type: response.data.discountType ?? '',
            amount_type: response.data.amountType ?? '',
            amount: response.data.amount ?? 0,
            period_type: response.data.periodType ?? '',
            start_date: response.data.startDate ?? '',
            end_date: response.data.endDate ?? '',
            specific_days: response.data.specificDays ?? '',
            customer_only: response.data.customerOnly ?? false,
            status: response.data.isStatus ?? false,
            quota: response.data.quota ?? null,
            quotaRadio: response.data.quota != null ? '1' : '0',
            created_at: response.data.createdAt ?? '',
            updated_at: response.data.updatedAt ?? '',
            condition_value: '',
          });
          this.unit.set(response.data.amountType ?? 'BAHT');
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
    this.promotionService
      .getItemListIncluded(this.promotionId)
      .pipe(
        tap((response) => {
          this.itemListIncluded = response.data.map((item: PromotionItem) => {
            return { ...item, selected: true };
          });
          if (this.itemListIncluded.length > 0) {
            this.includedItemStatus = true;
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
    this.promotionService
      .getItemListExcluded(this.promotionId)
      .pipe(
        tap((response) => {
          this.itemListExcluded = response.data.map((item: PromotionItem) => {
            return { ...item, selected: true };
          });
          if (this.itemListExcluded.length > 0) {
            this.excludedItemStatus = true;
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
  onBack() {
    this.router.navigate(['/promotion/list']);
  }
  onReset() {
    this.getData();
  }
  onSave() {
    const formData = {
      promotionDetail: { ...this.promotionForm.value },
      included: {
        active: this.includedItemStatus,
        items: this.itemListIncluded,
      },
      excluded: {
        active: this.excludedItemStatus,
        items: this.itemListExcluded,
      },
    };
    console.log(formData);
  }

  @ViewChild('addItemModal') addItemModal!: TemplateRef<any>;
  searchText = '';
  selectAll = false;
  itemList: PromotionItem[] = [];
  filteredItemList: PromotionItem[] = [];
  itemListIncluded: PromotionItem[] = []; // โหลดจาก service
  itemListExcluded: PromotionItem[] = []; // โหลดจาก service
  currentAddType: 'included' | 'excluded' = 'included';

  openAddItemModal(type: 'included' | 'excluded') {
    this.searchText = '';
    this.currentAddType = type;
    this.getItemList();
  }

  filterItemList() {
    const text = this.searchText.trim().toLowerCase();
    console.log('Filtering item list with text:', text);
    this.filteredItemList = this.itemList.filter(
      (item: PromotionItem) =>
        (item.name ?? '').toLowerCase().includes(text) ||
        (item.description ?? '').toLowerCase().includes(text),
    );
  }

  toggleSelectAll() {
    this.filteredItemList.forEach((item) => (item.selected = this.selectAll));
  }

  confirmAddItems(modal: any) {
    const selectedItems = this.filteredItemList.filter((item) => item.selected);
    if (this.currentAddType === 'included') {
      this.itemListIncluded = [...selectedItems];
    } else if (this.currentAddType === 'excluded') {
      this.itemListExcluded = [...selectedItems];
    }
    modal.close();
  }

  getItemList() {
    const type = this.promotionForm.get('discount_category')?.value ?? 'ALL';
    this.promotionService.getItemList(type).subscribe((response) => {
      this.itemList = response.data.map((item: PromotionItem) => {
        let selected = false;
        if (this.currentAddType === 'included') {
          selected = this.itemListIncluded.some((i) => i.id === item.id);
        } else if (this.currentAddType === 'excluded') {
          selected = this.itemListExcluded.some((i) => i.id === item.id);
        }
        return { ...item, selected };
      });
      this.filteredItemList = this.itemList;
      this.selectAll = this.filteredItemList.every((item) => item.selected);
      this.modalService.open(this.addItemModal, { size: 'lg', centered: true });
    });
  }
  removeIncludedItem(index: number) {
    this.itemListIncluded.splice(index, 1);
  }

  removeExcludedItem(index: number) {
    this.itemListExcluded.splice(index, 1);
  }
}
