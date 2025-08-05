import { LocaleService } from '@/app/services/locale.service';
import { PaymentService } from '@/app/services/payment.service';
import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { catchError, tap, throwError } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService } from '@/app/services/master.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartItem, PromotionDiscount } from '@/app/services/model';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    BreadcrumbComponent,
    NgSelectModule,
    NgClass,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements AfterViewChecked {
  private localeService = inject(LocaleService);
  private paymentService = inject(PaymentService);
  private masterService = inject(MasterService);
  locale = this.localeService.getLocale();

  customerList: any[] = [];
  petList: any[] = [];
  tags: any[] = [];

  customerId: any = null;
  petId!: number | null;
  selectedTags = new Set<number>();
  selectedShopType: string = 'GROOMING';

  tagsGrooming: any[] = [];
  tagsPetShop: any[] = [];
  selectedTagsGrooming = new Set<number>();
  selectedTagsPetShop = new Set<number>();

  filter = '';
  groomingItems: any[] = [];
  originalGroomingItems: any[] = [];
  petShopItems: any[] = [];
  originalPetShopItems: any[] = [];

  selectedItems: { key: string; count: number }[] = [];
  orderSeq = 0;

  @ViewChild('cartTable') cartTable!: ElementRef<HTMLDivElement>;
  private shouldScrollToBottom = false;

  currentCart: CartItem[] = [];

  ngOnInit(): void {
    this.getCustomerList();
    this.getTagsGrooming();
    this.getTagsPetShop();
    this.getPetShopServiceList();
  }

  // lifecycle hook หลังจาก Angular render view เสร็จ
  ngAfterViewChecked() {
    if (this.shouldScrollToBottom && this.cartTable) {
      const el = this.cartTable.nativeElement;
      el.scrollTop = el.scrollHeight; // เลื่อน scroll ลงล่างสุด
      this.shouldScrollToBottom = false;
    }
  }

  getGroomingServiceList(typeId: any) {
    this.paymentService
      .getGroomingServiceList(typeId)
      .pipe(
        tap((response) => {
          this.originalGroomingItems = response.data ?? [];
          this.groomingItems = this.originalGroomingItems.map((item: any) => ({
            id: item.id,
            name: item.name,
            remark: item.remark || '-',
            price: item.price,
          }));
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  getPetShopServiceList() {
    this.paymentService
      .getPetShopServiceList()
      .pipe(
        tap((response) => {
          this.originalPetShopItems = response.data ?? [];
          this.petShopItems = this.originalPetShopItems.map((item: any) => ({
            id: item.id,
            name: item.name,
            remark: item.remark || '-',
            price: item.price,
            stock: item.stock,
          }));
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  getCustomerList() {
    this.paymentService
      .getCustomers()
      .pipe(
        tap((response) => {
          this.customerList = response.data ?? [];
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  getTagsGrooming() {
    this.masterService
      .getTags('GROOMING')
      .pipe(
        tap((response) => {
          this.tagsGrooming = response.data ?? [];
          if (this.selectedShopType === 'GROOMING') {
            this.tags = this.tagsGrooming;
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  getTagsPetShop() {
    this.masterService
      .getTags('PET_SHOP')
      .pipe(
        tap((response) => {
          this.tagsPetShop = response.data ?? [];
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  getPetListByCustomerId() {
    if (this.customerId) {
      this.paymentService
        .getPetListByCustomerId(this.customerId)
        .pipe(
          tap((response) => {
            this.petList = response.data ?? [];
          }),
          catchError((error) => {
            return throwError(() => error);
          }),
        )
        .subscribe();
    }
  }

  onCustomerChange(item: any) {
    if (item) {
      this.customerId = item.key;
      this.getPetListByCustomerId();
    }
  }

  customSearchFn(term: string, item: any): boolean {
    const normalize = (value: string) =>
      value?.toLowerCase().replace(/-/g, '').replace(/\s+/g, '') ?? '';

    return normalize(item.name).includes(normalize(term));
  }

  onPetChange(item: any) {
    if (item) {
      this.petId = item.key;
      this.getGroomingServiceList(item.petTypeId);
    } else {
      this.petId = null;
    }
    this.selectedTags = new Set<number>();
  }

  toggleTag(id: number): void {
    if (this.selectedTags.has(id)) {
      this.selectedTags.delete(id);
    } else {
      this.selectedTags.add(id);
    }
    this.filterItems();
  }

  isSelected(id: number): boolean {
    return this.selectedTags.has(id);
  }

  onShopTypeChange(value: any): void {
    let type = value;
    if (type == 'GROOMING') {
      this.selectedTagsPetShop = this.selectedTags;
      this.tags = this.tagsGrooming;
      this.selectedTags = this.selectedTagsGrooming;
    } else if (type == 'PET_SHOP') {
      this.selectedTagsGrooming = this.selectedTags;
      this.tags = this.tagsPetShop;
      this.selectedTags = this.selectedTagsPetShop;
    } else {
      this.tags = [];
      this.selectedTags = new Set<number>();
    }
    console.log(this.petId);
  }

  onSearch() {
    this.filterItems();
  }

  filterItems() {
    if (this.selectedShopType === 'GROOMING') {
      if (this.selectedTags.size === 0) {
        this.groomingItems = this.originalGroomingItems.map((item: any) => ({
          id: item.id,
          name: item.name,
          remark: item.remark || '-',
          price: item.price,
        }));
      } else {
        this.groomingItems = this.originalGroomingItems
          .filter((item: any) =>
            item.tags?.some((tag: any) => this.selectedTags.has(tag.id)),
          )
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            remark: item.remark || '-',
            price: item.price,
          }));
      }
      this.groomingItems = this.groomingItems.filter((item: any) =>
        item.name.toLowerCase().includes(this.filter.toLowerCase()),
      );
    } else if (this.selectedShopType === 'PET_SHOP') {
      if (this.selectedTags.size === 0) {
        this.petShopItems = this.originalPetShopItems.map((item: any) => ({
          id: item.id,
          name: item.name,
          remark: item.remark || '-',
          price: item.price,
          stock: item.stock,
        }));
      } else {
        this.petShopItems = this.originalPetShopItems
          .filter((item: any) =>
            item.tags?.some((tag: any) => this.selectedTags.has(tag.id)),
          )
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            remark: item.remark || '-',
            price: item.price,
            stock: item.stock,
          }));
      }
      this.petShopItems = this.petShopItems.filter((item: any) =>
        item.name.toLowerCase().includes(this.filter.toLowerCase()),
      );
    }
  }

  toggleGroomingItemSelection(event: MouseEvent, key: string): void {
    event.stopPropagation(); // กันไม่ให้ trigger การ์ดคลิกซ้ำ
    const existing = this.selectedItems.find((i) => i.key === key);
    let mode = '';
    if (existing) {
      this.selectedItems = this.selectedItems.filter((i) => i.key !== key);
      mode = 'remove';
    } else {
      this.selectedItems.push({ key, count: 1 });
      mode = 'add';
    }
    if (mode === 'add') {
      this.addToCart(key);
    } else {
      this.removeFromCart(key);
    }
  }

  togglePetShopItemSelection(event: MouseEvent, key: string): void {
    event.stopPropagation(); // กันไม่ให้ trigger การ์ดคลิกซ้ำ
    const existing = this.selectedItems.find((i) => i.key === key);
    let mode = '';
    if (existing) {
      mode = 'increase';
    } else {
      this.selectedItems.push({ key, count: 1 });
      mode = 'add';
    }
    if (mode === 'add') {
      this.addToCart(key);
    } else {
      this.increaseToCart(key);
    }
  }

  addToCart(item: any): void {
    const key = item;
    const parts = key.split('|');
    const type = parts[0] as 'G' | 'P';
    const itemId = +parts[1];
    const petId = type === 'G' ? +parts[2] : undefined;
    const product =
      type === 'G'
        ? this.groomingItems.find((i) => i.id === itemId)
        : this.petShopItems.find((i) => i.id === itemId);
    this.currentCart.push({
      key,
      name: product?.name || '',
      type,
      petId,
      itemId,
      quantity: 1,
      price: product?.price || 0,
      total: product?.price || 0,
    });
    this.shouldScrollToBottom = true;
  }

  removeFromCart(key: string): void {
    const index = this.currentCart.findIndex((i) => i.key === key);
    if (index !== -1) {
      this.currentCart.splice(index, 1);
    }
    this.shouldScrollToBottom = true;
  }

  increaseToCart(key: string): void {
    const item = this.currentCart.find((i) => i.key === key);
    if (item) {
      if (typeof item.quantity === 'number') {
        item.quantity!++;
      }
      item.total = (item.quantity ?? 1) * (item.price ?? 0);
    } else {
      this.addToCart(key);
    }
  }

  isItemSelected(key: string): boolean {
    return this.selectedItems.some((i) => i.key === key);
  }

  decreaseItemCount(event: MouseEvent, key: string): void {
    event.stopPropagation(); // กันไม่ให้ trigger การ์ดคลิกซ้ำ
    const index = this.currentCart.findIndex((i) => i.key === key);
    if (index !== -1 && this.currentCart[index] !== undefined) {
      if ((this.currentCart[index]?.quantity ?? 0) > 1) {
        if (
          this.currentCart[index] &&
          typeof this.currentCart[index].quantity === 'number'
        ) {
          this.currentCart[index].quantity--;
          this.currentCart[index].total =
            this.currentCart[index].quantity! * this.currentCart[index].price!;
        }
      } else {
        this.currentCart.splice(index, 1);
      }
    }
    if (this.currentCart.findIndex((i) => i.key === key) === -1) {
      this.selectedItems = this.selectedItems.filter((i) => i.key !== key);
    }
  }

  petName(petId: number): string {
    const pet = this.petList.find((p) => p.key === petId);
    return pet ? pet.name : '';
  }

  get cartTotal(): number {
    return this.currentCart.reduce((sum, item) => sum + Number(item.total), 0);
  }

  increaseItemCountFromCart(key: string): void {
    const item = this.currentCart.find((i) => i.key === key);
    if (item && typeof item.quantity === 'number') {
      item.quantity!++;
    }
    this.shouldScrollToBottom = true;
  }

  discountBreakdown: PromotionDiscount[] = [];

  discountTotal = this.discountBreakdown.reduce(
    (sum, d) => sum + (d.amount ?? 0),
    0,
  );

  onCalculate() {
    this.paymentService
      .calculatePayment(this.currentCart)
      .pipe(
        tap((response) => {
          this.discountBreakdown = response.data?.discountBreakdown ?? [];
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
