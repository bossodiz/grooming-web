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
import { firstValueFrom } from 'rxjs';

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

  isLoaded = false;
  isNew = false;
  promotionId: string | null = null;

  submit!: boolean;

  promotionForm!: UntypedFormGroup;

  dayList = [
    { key: 'MONDAY', label: 'จันทร์' },
    { key: 'TUESDAY', label: 'อังคาร' },
    { key: 'WEDNESDAY', label: 'พุธ' },
    { key: 'THURSDAY', label: 'พฤหัสบดี' },
    { key: 'FRIDAY', label: 'ศุกร์' },
    { key: 'SATURDAY', label: 'เสาร์' },
    { key: 'SUNDAY', label: 'อาทิตย์' },
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
      console.log('Current Start Date:', currentValueStart);
      console.log('Current End Date:', currentValueEnd);
      if (inputId === 'datetime-datepicker-end') {
        if (currentValueEnd) {
          instance.setDate(currentValueEnd, true);
          if (currentValueStart) {
            instance.set('minDate', currentValueStart);
          }
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

  flatpickrCreatedOptions: Options = {
    locale: Thai,
    altInput: true,
    altFormat: 'D d M Y | H:i',
    dateFormat: 'Y-m-d\\TH:i:S',
    allowInput: false,
    clickOpens: false,
  };

  includedItemStatus = false;
  excludedItemStatus = false;

  ngOnInit(): void {
    this.promotionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      discount_category: [null, [Validators.required]],
      discount_type: [null, [Validators.required]],
      amount_type: [null],
      amount_normal: [null],
      amount_more_than: [null],
      discount_more_than: [null],
      amount_free: [null],
      amount_free_bonus: [null],
      period_type: ['', [Validators.required]],
      start_date: [''],
      end_date: [''],
      specific_days: this.formBuilder.control([], {
        nonNullable: true,
      }),
      customer_only: [null, [Validators.required]],
      status: [false, [Validators.required]],
      quota: [null],
      quota_type: ['', [Validators.required]],
      created_at: [''],
      updated_at: [''],
    });
    this.dynamicRequireDiscountType();
    this.dynamicRequirePeriodType();
    this.dynamicRequireQuota();
    this.route.paramMap.subscribe((params) => {
      this.promotionId = params.get('id');
      if (this.promotionId != 'new') {
        this.getData();
      } else {
        this.isLoaded = true;
        this.isNew = true;
      }
    });
  }

  dynamicRequireDiscountType() {
    this.promotionForm.get('discount_type')?.valueChanges.subscribe((type) => {
      // ล้าง validators เก่าทุกครั้งก่อน
      this.promotionForm.get('amount_normal')?.clearValidators();
      this.promotionForm.get('amount_more_than')?.clearValidators();
      this.promotionForm.get('discount_more_than')?.clearValidators();
      this.promotionForm.get('amount_free')?.clearValidators();
      this.promotionForm.get('amount_free_bonus')?.clearValidators();

      if (type === 'NORMAL') {
        this.promotionForm
          .get('amount_normal')
          ?.setValidators([Validators.required]);
      }

      if (type === 'MORE_THAN') {
        this.promotionForm
          .get('amount_more_than')
          ?.setValidators([Validators.required]);
        this.promotionForm
          .get('discount_more_than')
          ?.setValidators([Validators.required]);
      }

      if (type === 'FREE') {
        this.promotionForm
          .get('amount_free')
          ?.setValidators([Validators.required]);
        this.promotionForm
          .get('amount_free_bonus')
          ?.setValidators([Validators.required]);
      }

      // บังคับ Angular ตรวจสอบใหม่
      this.promotionForm.get('amount_normal')?.updateValueAndValidity();
      this.promotionForm.get('amount_more_than')?.updateValueAndValidity();
      this.promotionForm.get('discount_more_than')?.updateValueAndValidity();
      this.promotionForm.get('amount_free')?.updateValueAndValidity();
      this.promotionForm.get('amount_free_bonus')?.updateValueAndValidity();
    });
  }

  dynamicRequirePeriodType() {
    this.promotionForm.get('period_type')?.valueChanges.subscribe((type) => {
      // ล้าง validators เก่าทุกครั้งก่อน
      this.promotionForm.get('start_date')?.clearValidators();
      this.promotionForm.get('end_date')?.clearValidators();
      this.promotionForm.get('specific_days')?.clearValidators();
      if (type === 'DATE_RANGE') {
        this.promotionForm
          .get('start_date')
          ?.setValidators([Validators.required]);
        this.promotionForm
          .get('end_date')
          ?.setValidators([Validators.required]);
      }
      if (type === 'SPECIFIC_DAYS') {
        this.promotionForm
          .get('specific_days')
          ?.setValidators([Validators.required]);
      }
      // บังคับ Angular ตรวจสอบใหม่
      this.promotionForm.get('start_date')?.updateValueAndValidity();
      this.promotionForm.get('end_date')?.updateValueAndValidity();
      this.promotionForm.get('specific_days')?.updateValueAndValidity();
    });
  }

  dynamicRequireQuota() {
    this.promotionForm.get('quota_type')?.valueChanges.subscribe((value) => {
      if (value == 1) {
        this.promotionForm.get('quota')?.setValidators([Validators.required]);
      } else {
        this.promotionForm.get('quota')?.clearValidators();
      }
      this.promotionForm.get('quota')?.updateValueAndValidity();
    });
  }

  async getData() {
    if (!this.promotionId) {
      return;
    }
    try {
      const responsePromotion = await firstValueFrom(
        this.promotionService.getPromotionById(this.promotionId),
      );
      this.promotionForm.patchValue({
        name: responsePromotion.data.name ?? '',
        discount_category: responsePromotion.data.discountCategory ?? '',
        discount_type: responsePromotion.data.discountType ?? '',
        amount_type: responsePromotion.data.amountType ?? '',
        amount_normal: responsePromotion.data.amountNormal ?? null,
        amount_more_than: responsePromotion.data.amountMoreThan ?? null,
        discount_more_than: responsePromotion.data.discountMoreThan ?? null,
        amount_free: responsePromotion.data.amountFree ?? null,
        amount_free_bonus: responsePromotion.data.amountFreeBonus ?? null,
        period_type: responsePromotion.data.periodType ?? '',
        start_date: responsePromotion.data.startDate ?? '',
        end_date: responsePromotion.data.endDate ?? '',
        specific_days: responsePromotion.data.specificDays ?? '',
        customer_only: responsePromotion.data.customerOnly ?? null,
        status: responsePromotion.data.isStatus ?? false,
        quota: responsePromotion.data.quota ?? null,
        quota_type: responsePromotion.data.quotaType ?? 0,
        created_at: responsePromotion.data.createdAt ?? '',
        updated_at: responsePromotion.data.updatedAt ?? '',
      });
      this.unit.set(responsePromotion.data.amountType ?? 'BAHT');
      if (responsePromotion.data.discountType === 'FREE') {
        const responseBought = await firstValueFrom(
          this.promotionService.getItemListBought(this.promotionId),
        );
        this.itemListBuy = responseBought.data.map((item: PromotionItem) => {
          return { ...item, selected: true };
        });
        const responseFree = await firstValueFrom(
          this.promotionService.getItemListFree(this.promotionId),
        );
        this.itemListFree = responseFree.data.map((item: PromotionItem) => {
          return { ...item, selected: true };
        });
      } else {
        const responseIncluded = await firstValueFrom(
          this.promotionService.getItemListIncluded(this.promotionId),
        );
        this.itemListIncluded = responseIncluded.data.map(
          (item: PromotionItem) => {
            return { ...item, selected: true };
          },
        );
        if (this.itemListIncluded.length > 0) {
          this.includedItemStatus = true;
        }

        const responseExcluded = await firstValueFrom(
          this.promotionService.getItemListExcluded(this.promotionId),
        );
        this.itemListExcluded = responseExcluded.data.map(
          (item: PromotionItem) => {
            return { ...item, selected: true };
          },
        );
        if (this.itemListExcluded.length > 0) {
          this.excludedItemStatus = true;
        }
      }
      this.isLoaded = true;
    } catch (err) {
      throwError(() => err);
    }
  }
  onBack() {
    this.router.navigate(['/promotion/list']);
  }
  onReset() {
    this.getData();
  }
  onSave() {
    const formData = {
      promotionId: this.promotionId != 'new' ? this.promotionId : null,
      promotionDetail: { ...this.promotionForm.value },
      included: {
        active: this.includedItemStatus,
        items: this.itemListIncluded.map((item) => item.id),
      },
      excluded: {
        active: this.excludedItemStatus,
        items: this.itemListExcluded.map((item) => item.id),
      },
      bought: {
        active: true,
        items: this.itemListBuy.map((item) => item.id),
      },
      free: {
        active: true,
        items: this.itemListFree.map((item) => item.id),
      },
    };
    if (this.promotionForm.get('discount_type')?.value === 'FREE') {
      formData.promotionDetail.amount_type = 'EACH';
    } else {
      formData.promotionDetail.amount_type = this.unit();
    }
    this.promotionService
      .updatePromotion(formData)
      .pipe(
        tap((response) => {
          this.isNew = false;
          this.router.navigate(['/promotion/detail', response.data], {
            replaceUrl: true,
          });
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  @ViewChild('addItemModal') addItemModal!: TemplateRef<any>;
  searchText = '';
  selectAll = false;
  itemList: PromotionItem[] = [];
  filteredItemList: PromotionItem[] = [];
  itemListIncluded: PromotionItem[] = []; // โหลดจาก service
  itemListExcluded: PromotionItem[] = []; // โหลดจาก service
  itemListBuy: PromotionItem[] = []; // โหลดจาก service
  itemListFree: PromotionItem[] = []; // โหลดจาก service
  currentAddType: 'included' | 'excluded' | 'buy' | 'free' = 'included';

  getModalTitle(): string {
    switch (this.currentAddType) {
      case 'included':
        return 'เลือกสินค้าที่เข้าร่วมโปรโมชั่น';
      case 'excluded':
        return 'เลือกสินค้าที่ถูกยกเว้น';
      case 'buy':
        return 'เลือกสินค้าที่ต้องซื้อ';
      case 'free':
        return 'เลือกสินค้าที่แถม';
      default:
        return 'เลือกสินค้า';
    }
  }

  openAddItemModal(type: 'included' | 'excluded' | 'buy' | 'free') {
    this.searchText = '';
    this.currentAddType = type;
    this.getItemList();
  }

  filterItemList() {
    const text = this.searchText.trim().toLowerCase();
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
    } else if (this.currentAddType === 'buy') {
      this.itemListBuy = [...selectedItems];
    } else if (this.currentAddType === 'free') {
      this.itemListFree = [...selectedItems];
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
        } else if (this.currentAddType === 'buy') {
          selected = this.itemListBuy.some((i) => i.id === item.id);
        } else if (this.currentAddType === 'free') {
          selected = this.itemListFree.some((i) => i.id === item.id);
        }
        return { ...item, selected };
      });
      // กรอง item ที่มีอยู่แล้วใน included/excluded ออก
      if (this.currentAddType === 'included') {
        this.filteredItemList = this.itemList.filter(
          (item) => !this.itemListExcluded.some((i) => i.id === item.id),
        );
      } else if (this.currentAddType === 'excluded') {
        this.filteredItemList = this.itemList.filter(
          (item) => !this.itemListIncluded.some((i) => i.id === item.id),
        );
      } else {
        this.filteredItemList = this.itemList;
      }

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

  removeBuyItem(index: number) {
    this.itemListBuy.splice(index, 1);
  }

  removeFreeItem(index: number) {
    this.itemListFree.splice(index, 1);
  }

  onDayCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    let selectedDays = this.promotionForm.value.specific_days || [];
    if (input.checked) {
      selectedDays = [...selectedDays, value];
    } else {
      selectedDays = selectedDays.filter((d: string) => d !== value);
    }
    this.promotionForm.get('specific_days')?.setValue(selectedDays);
  }

  @ViewChild('deleteItemModal') deleteItemModal!: TemplateRef<any>;
  deleteType: 'included' | 'excluded' | 'buy' | 'free' = 'included';

  openDeleteItemModal(type: 'included' | 'excluded' | 'buy' | 'free') {
    this.deleteType = type;
    this.modalService.open(this.deleteItemModal, { centered: true });
  }

  confirmDeleteAll(modal: any) {
    if (this.deleteType === 'included') {
      this.itemListIncluded = [];
    } else if (this.deleteType === 'excluded') {
      this.itemListExcluded = [];
    } else if (this.deleteType === 'buy') {
      this.itemListBuy = [];
    } else if (this.deleteType === 'free') {
      this.itemListFree = [];
    }
    modal.close();
  }

  @ViewChild('categoryChangeModal') categoryChangeModal!: TemplateRef<any>;
  pendingCategoryValue: string | null = null;

  // helper เช็คสถานะที่ “ยืนยันแล้ว”
  isSelectedCategory(val: string) {
    return this.promotionForm.get('discount_category')?.value === val;
  }

  // คลิก/กด space/enter ที่ radio
  onCategoryClick(event: Event, nextValue: string) {
    console.log('Clicked category:', nextValue);
    const ctrl = this.promotionForm.get('discount_category');
    const currentValue = ctrl?.value ?? null;
    // ไม่ทำอะไรถ้ากดซ้ำค่าปัจจุบัน
    if (currentValue === nextValue) {
      return;
    }
    const needsConfirm =
      this.itemListIncluded.length > 0 ||
      this.itemListExcluded.length > 0 ||
      this.includedItemStatus ||
      this.excludedItemStatus;

    if (needsConfirm) {
      // กัน default เพื่อไม่ให้ radio ติ๊กเอง
      event.preventDefault();
      this.pendingCategoryValue = nextValue;
      this.modalService.open(this.categoryChangeModal, { centered: true });
      return;
    }

    // เคส "ไม่ต้องยืนยัน" (รวมถึงครั้งแรกที่ค่าเป็น null)
    // กัน default แล้วตั้งค่าเอง เพื่อให้ state ฟอร์มกับ UI ตรงกันทันที
    ctrl?.setValue(nextValue);
  }

  // ปุ่มซ้าย: ลบทันที
  clearAllAndChangeCategory(modal: any) {
    this.itemListIncluded = [];
    this.itemListExcluded = [];
    this.includedItemStatus = false;
    this.excludedItemStatus = false;
    if (this.pendingCategoryValue) {
      this.promotionForm
        .get('discount_category')
        ?.setValue(this.pendingCategoryValue);
    }
    modal.close();
    this.pendingCategoryValue = null;
  }

  // ปุ่มกลาง: ตกลง (ไม่เปลี่ยนค่า)
  confirmCategoryChange(modal: any) {
    modal.close();
    this.pendingCategoryValue = null;
  }

  checkCanBtnSave() {
    let isValid = false;
    if (this.promotionForm.valid) {
      isValid = true;
    }
    if (this.promotionForm.get('discount_type')?.value === 'FREE') {
      isValid = this.itemListFree.length != 0 && this.itemListBuy.length != 0;
    }
    return !isValid;
  }
}
