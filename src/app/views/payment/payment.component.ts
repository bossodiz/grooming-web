import { LocaleService } from '@/app/services/locale.service';
import { PaymentService } from '@/app/services/payment.service';
import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  catchError,
  tap,
  throwError,
  Subject,
  debounceTime,
  takeUntil,
  Subscription,
  switchMap,
  finalize,
} from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService } from '@/app/services/master.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  ApiResponse,
  AppliedPromotion,
  CartItem,
  CartItemResult,
  GenerateQrResponse,
} from '@/app/services/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// ---- Minimal typings to replace any ----
export type ShopType = 'GROOMING' | 'PET_SHOP';

interface Option {
  key: number;
  label?: string;
  name?: string;
  phone?: string;
  petTypeId?: number;
}
interface Tag {
  id: number;
  name: string;
}
interface GroomingItem {
  id: number;
  name: string;
  remark: string;
  price: number;
  tags?: Tag[];
}
interface PetShopItem {
  id: number;
  name: string;
  remark: string;
  price: number;
  stock: number;
  tags?: Tag[];
}

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
export class PaymentComponent implements AfterViewChecked, OnDestroy {
  private localeService = inject(LocaleService);
  private paymentService = inject(PaymentService);
  private masterService = inject(MasterService);
  private modalService = inject(NgbModal);
  locale = this.localeService.getLocale();

  // ---- Data sources ----
  customerList: Option[] = [];
  petList: Option[] = [];
  tags: Tag[] = [];

  // ---- Selection state ----
  customerId: number | null = null;
  petId: number | null = null;
  selectedShopType: ShopType = 'GROOMING';

  tagsGrooming: Tag[] = [];
  tagsPetShop: Tag[] = [];
  selectedTagsGrooming = new Set<number>();
  selectedTagsPetShop = new Set<number>();
  // pointer to the active set (do not mutate directly outside helpers)
  selectedTags = new Set<number>();

  // ---- Items ----
  filter = '';
  groomingItems: GroomingItem[] = [];
  originalGroomingItems: GroomingItem[] = [];
  petShopItems: PetShopItem[] = [];
  originalPetShopItems: PetShopItem[] = [];

  // cards selection (for visual state) & cart
  selectedItems: { key: string; count: number }[] = [];
  currentCart: CartItem[] = [];

  @ViewChild('cartTable') cartTable!: ElementRef<HTMLDivElement>;
  shouldScrollToBottom = false;

  // ---- reactive search ----
  search$ = new Subject<string>();
  destroy$ = new Subject<void>();

  // ---- calculation result ----
  cartChanges$ = new Subject<void>();
  calculateSub?: Subscription;
  isCalculateLoading = false;

  invoiceNo: string | null = null;

  summaryItems: CartItemResult[] = [];
  appliedPromotionsFlat: { name: string; amount: number }[] = [];
  overallPromotion: AppliedPromotion | null = null;
  warningPromotions: string[] = [];
  totalBeforeDiscount = 0;
  discountTotal = 0;
  totalAfterDiscount = 0;
  itemCount = 0;
  now: Date | null = null;

  @ViewChild('cashInput') cashInput!: ElementRef;
  cashReceived: number = 0;
  cashChange: number | null = null;
  isCashLoading: boolean = false;

  @ViewChild('qrModal') qrModalTpl!: any;
  isQrLoading = false;
  qrError = '';
  qr = {
    invoiceNo: '' as string | undefined,
    amount: undefined as number | undefined,
    imageDataUrl: '' as string | undefined,
    expiresAt: '' as string | undefined,
  };

  ngOnInit(): void {
    this.getCustomerList();
    this.getTagsGrooming();
    this.getTagsPetShop();
    this.getPetShopServiceList();

    // พรีวิวอัตโนมัติเมื่อ cart เปลี่ยน (debounce กันสั่น)
    this.calculateSub = this.cartChanges$
      .pipe(
        debounceTime(400),
        tap(() => {
          this.isCalculateLoading = true;
        }),
        switchMap(() =>
          this.paymentService
            .calculatePayment(this.currentCart, this.invoiceNo ?? undefined)
            .pipe(finalize(() => (this.isCalculateLoading = false))),
        ),
      )
      .subscribe((resp) => this.applyCalcResponse(resp?.data));
  }

  ngOnDestroy(): void {
    this.calculateSub?.unsubscribe();
  }

  // lifecycle hook หลังจาก Angular render view เสร็จ
  ngAfterViewChecked() {
    if (this.shouldScrollToBottom && this.cartTable) {
      const el = this.cartTable.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.shouldScrollToBottom = false;
    }
  }

  // ---- API calls ----
  getGroomingServiceList(typeId: number) {
    this.paymentService
      .getGroomingServiceList(typeId)
      .pipe(
        tap((response) => {
          this.originalGroomingItems = (response.data ?? []).map(
            (item: any) =>
              ({
                id: item.id,
                name: item.name,
                remark: item.remark || '-',
                price: item.price,
                tags: item.tags ?? [],
              }) as GroomingItem,
          );
          this.groomingItems = [...this.originalGroomingItems];
        }),
        catchError((error) => throwError(() => error)),
      )
      .subscribe();
  }

  getPetShopServiceList() {
    this.paymentService
      .getPetShopServiceList()
      .pipe(
        tap((response) => {
          this.originalPetShopItems = (response.data ?? []).map(
            (item: PetShopItem) =>
              ({
                id: item.id,
                name: item.name,
                remark: item.remark || '-',
                price: item.price,
                stock: item.stock,
                tags: item.tags ?? [],
              }) as PetShopItem,
          );
          this.petShopItems = [...this.originalPetShopItems];
        }),
        catchError((error) => throwError(() => error)),
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
        catchError((error) => throwError(() => error)),
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
            this.selectedTags = this.selectedTagsGrooming;
          }
        }),
        catchError((error) => throwError(() => error)),
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
        catchError((error) => throwError(() => error)),
      )
      .subscribe();
  }

  getPetListByCustomerId() {
    if (!this.customerId) return;

    this.paymentService
      .getPetListByCustomerId(this.customerId)
      .pipe(
        tap((response) => {
          this.petList = response.data ?? [];
        }),
        catchError((error) => throwError(() => error)),
      )
      .subscribe();
  }

  // ---- UI handlers ----
  onCustomerChange(item: Option | null) {
    if (item) {
      this.customerId = item.key;
      this.getPetListByCustomerId();
    }
  }

  customSearchFn(term: string, item: Option): boolean {
    const normalize = (value: string) =>
      value?.toLowerCase().replace(/-/g, '').replace(/\s+/g, '') ?? '';
    return normalize(item.name ?? item.label ?? '').includes(normalize(term));
  }

  onPetChange(item: Option | null) {
    if (item) {
      this.petId = Number(item.key);
      const petTypeId = (item as any).petTypeId as number | undefined;
      if (petTypeId != null) this.getGroomingServiceList(petTypeId);
    } else {
      this.petId = null;
    }
    // reset tags for grooming
    this.selectedTagsGrooming = new Set<number>();
    if (this.selectedShopType === 'GROOMING')
      this.selectedTags = this.selectedTagsGrooming;

    // clear grooming selections from cart/selection to avoid cross-pet leakage
    this.selectedItems = this.selectedItems.filter(
      (s) => !s.key.startsWith('G|'),
    );
    this.currentCart = this.currentCart.filter((c) => c.type !== 'G');

    this.filterItems();
  }

  toggleTag(id: number): void {
    const activeSet =
      this.selectedShopType === 'GROOMING'
        ? this.selectedTagsGrooming
        : this.selectedTagsPetShop;
    if (activeSet.has(id)) activeSet.delete(id);
    else activeSet.add(id);
    this.selectedTags = activeSet; // keep pointer in sync
    this.filterItems();
  }

  isSelected(id: number): boolean {
    const activeSet =
      this.selectedShopType === 'GROOMING'
        ? this.selectedTagsGrooming
        : this.selectedTagsPetShop;
    return activeSet.has(id);
  }

  onShopTypeChange(value: ShopType): void {
    this.selectedShopType = value;
    if (value === 'GROOMING') {
      this.tags = this.tagsGrooming;
      this.selectedTags = this.selectedTagsGrooming;
    } else if (value === 'PET_SHOP') {
      this.tags = this.tagsPetShop;
      this.selectedTags = this.selectedTagsPetShop;
    } else {
      this.tags = [];
      this.selectedTags = new Set<number>();
    }
    this.filterItems();
  }

  onSearch() {
    this.search$.next(this.filter);
  }

  filterItems() {
    if (this.selectedShopType === 'GROOMING') {
      const base = this.originalGroomingItems;
      const filteredByTag = this.selectedTagsGrooming.size
        ? base.filter((item) =>
            item.tags?.some((t) => this.selectedTagsGrooming.has(t.id)),
          )
        : base;
      this.groomingItems = filteredByTag.filter((item) =>
        item.name.toLowerCase().includes(this.filter.toLowerCase()),
      );
    } else {
      const base = this.originalPetShopItems;
      const filteredByTag = this.selectedTagsPetShop.size
        ? base.filter((item) =>
            item.tags?.some((t) => this.selectedTagsPetShop.has(t.id)),
          )
        : base;
      this.petShopItems = filteredByTag.filter((item) =>
        item.name.toLowerCase().includes(this.filter.toLowerCase()),
      );
    }
  }

  // ---- cart ops ----
  toggleGroomingItemSelection(event: MouseEvent, key: string): void {
    event.stopPropagation();
    const existing = this.selectedItems.find((i) => i.key === key);
    let mode: 'add' | 'remove';
    if (existing) {
      this.selectedItems = this.selectedItems.filter((i) => i.key !== key);
      mode = 'remove';
    } else {
      this.selectedItems.push({ key, count: 1 });
      mode = 'add';
    }
    if (mode === 'add') this.addToCart(key);
    else this.removeFromCart(key);
    this.cartChanges$.next();
  }

  togglePetShopItemSelection(event: MouseEvent, key: string): void {
    event.stopPropagation();
    const existing = this.selectedItems.find((i) => i.key === key);
    if (existing) {
      this.increaseToCart(key);
    } else {
      this.selectedItems.push({ key, count: 1 });
      this.addToCart(key);
    }
    this.cartChanges$.next();
  }

  private recalcItem(i: CartItem) {
    i.total = (i.quantity ?? 1) * (i.price ?? 0);
  }

  addToCart(key: string): void {
    const [typeRaw, idStr, petIdStr] = key.split('|');
    const type = typeRaw as 'G' | 'P';
    const itemId = Number(idStr);
    const petId = type === 'G' ? Number(petIdStr) : undefined;

    const product =
      type === 'G'
        ? this.groomingItems.find((i) => i.id === itemId)
        : this.petShopItems.find((i) => i.id === itemId);

    const newItem: CartItem = {
      key,
      name: product?.name || '',
      type,
      petId,
      itemId,
      quantity: 1,
      price: product?.price || 0,
      total: product?.price || 0,
    };

    this.currentCart.push(newItem);
    this.shouldScrollToBottom = true;
    this.cartChanges$.next();
  }

  removeFromCart(key: string): void {
    this.currentCart = this.currentCart.filter((i) => i.key !== key);
    this.shouldScrollToBottom = true;
    this.cartChanges$.next();
  }

  increaseToCart(key: string): void {
    const item = this.currentCart.find((i) => i.key === key);
    if (item) {
      // stock guard for Pet Shop items
      if (item.type === 'P') {
        const itemId = item.itemId!;
        const product = this.petShopItems.find((i) => i.id === itemId);
        const nextQty = (item.quantity ?? 0) + 1;
        if (product?.stock != null && nextQty > product.stock) return; // block exceeding stock
      }

      if (typeof item.quantity === 'number') item.quantity!++;
      this.recalcItem(item);
      this.cartChanges$.next();
    } else {
      this.addToCart(key);
    }
  }

  isItemSelected(key: string): boolean {
    return this.selectedItems.some((i) => i.key === key);
  }

  decreaseItemCount(event: MouseEvent, key: string): void {
    event.stopPropagation();
    const item = this.currentCart.find((i) => i.key === key);
    if (!item) return;

    if ((item.quantity ?? 0) > 1) {
      if (typeof item.quantity === 'number') {
        item.quantity!--;
        this.recalcItem(item);
      }
    } else {
      this.currentCart = this.currentCart.filter((i) => i.key !== key);
    }

    // sync selection chips
    if (!this.currentCart.some((i) => i.key === key)) {
      this.selectedItems = this.selectedItems.filter((i) => i.key !== key);
    }
    this.cartChanges$.next();
  }

  petName(petId: number): string {
    const pet = this.petList.find((p) => Number(p.key) === petId);
    return pet ? (pet.name ?? pet.label ?? '') : '';
  }

  get cartTotal(): number {
    return this.currentCart.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0,
    );
  }

  increaseItemCountFromCart(key: string): void {
    const item = this.currentCart.find((i) => i.key === key);
    if (item && typeof item.quantity === 'number') {
      // stock guard for Pet Shop items
      if (item.type === 'P') {
        const product = this.petShopItems.find((i) => i.id === item.itemId);
        const nextQty = item.quantity + 1;
        if (product?.stock != null && nextQty > product.stock) return;
      }
      item.quantity++;
      this.recalcItem(item);
    }
    this.shouldScrollToBottom = true;
    this.cartChanges$.next();
  }

  // for *ngFor trackBy
  trackByKey(_: number, item: CartItem) {
    return item.key;
  }

  get groupedPromotions(): { name: string; amount: number }[] {
    const map = new Map<string, number>();
    for (const p of this.appliedPromotionsFlat ?? []) {
      map.set(p.name, (map.get(p.name) ?? 0) + Number(p.amount ?? 0));
    }
    return [...map.entries()].map(([name, amount]) => ({ name, amount }));
  }

  get selectedCustomer(): any | undefined {
    return this.customerList.find((c) => c.key === this.customerId);
  }

  applyCalcResponse(data: any) {
    const items: CartItemResult[] = data?.items ?? [];

    this.summaryItems = items;
    this.totalBeforeDiscount = Number(data?.totalBeforeDiscount ?? 0);
    this.discountTotal = Number(data?.totalDiscount ?? 0);
    this.totalAfterDiscount = Number(data?.totalAfterDiscount ?? 0);
    this.warningPromotions = data?.warningPromotions ?? [];
    this.overallPromotion = data?.overallPromotion ?? null;
    this.invoiceNo = data?.invoiceNo ?? this.invoiceNo;

    this.itemCount = items.reduce((s, it) => s + Number(it.quantity ?? 0), 0);

    this.appliedPromotionsFlat = items.flatMap((it) =>
      (it.appliedPromotions ?? []).map((p) => ({
        name: p.name ?? 'Promotion',
        amount: Number(p.discountAmount ?? 0),
      })),
    );
  }

  isGroomingKey(key?: string | null): boolean {
    return !!key && key.startsWith('G|');
  }

  private extractPetIdFromKey(key?: string | null): number | null {
    if (!key) return null;
    const parts = key.split('|');
    return parts.length >= 3 ? Number(parts[2]) : null;
  }

  petNameFromItem(it: { key?: string; petId?: number }): string {
    const pid = it.petId ?? this.extractPetIdFromKey(it.key) ?? null;
    if (pid == null) return '';
    return this.petName(pid) || ''; // ใช้ฟังก์ชัน petName ที่คุณมีอยู่แล้ว
  }

  canAddPetShop(item: PetShopItem): boolean {
    if (!item || typeof item.stock !== 'number') return true;
    if (item.stock <= 0) return false;
    const inCartQty = this.currentCart
      .filter((c) => c.type === 'P' && c.itemId === item.id)
      .reduce((sum, c) => sum + Number(c.quantity ?? 0), 0);
    return inCartQty < item.stock;
  }

  getStockDisabledReason(item: any): string {
    if (!item || typeof item.stock !== 'number') return '';
    if (item.stock <= 0) return 'สินค้าหมด';
    const inCartQty = this.currentCart
      .filter((c) => c.type === 'P' && c.itemId === item.id)
      .reduce((sum, c) => sum + Number(c.quantity ?? 0), 0);
    return inCartQty >= item.stock ? 'ครบจำนวนในตะกร้า' : '';
  }

  canIncreaseFromCart(cartItem: CartItem): boolean {
    if (!cartItem || cartItem.type !== 'P') return true;
    const product = this.petShopItems.find((p) => p.id === cartItem.itemId);
    if (!product || typeof product.stock !== 'number') return true;
    return Number(cartItem.quantity ?? 0) < product.stock;
  }

  onPay(type: string) {
    // Implement payment logic here
  }

  openCashModal(content: any) {
    this.isCashLoading = true;
    this.cashReceived = 0;
    this.cashChange = null;
    const modalRef = this.modalService.open(content, { centered: true });

    modalRef.shown?.subscribe(() => {
      // บางเวอร์ชันไม่มี .shown ต้องใช้ setTimeout
      this.focusCashInput();
    });

    // fallback ใช้ setTimeout ให้แน่ใจว่า DOM render แล้ว
    setTimeout(() => this.focusCashInput(), 100);
  }

  focusCashInput() {
    if (this.cashInput) {
      this.cashInput.nativeElement.focus();
    }
  }

  onCashChange(value: string) {
    this.cashReceived = Number(value.replace(/,/g, '')); // เอา comma ออกก่อน parse
  }

  appendNumber(num: number) {
    this.cashReceived = Number(this.cashReceived.toString() + num.toString());
    this.calculateChange();
  }

  clearInput() {
    this.cashReceived = 0;
    this.cashChange = null;
  }

  calculateChange() {
    const received = Number(this.cashReceived);
    if (!isNaN(received) && received >= this.totalAfterDiscount) {
      this.cashChange = received - this.totalAfterDiscount;
    } else {
      this.cashChange = null;
    }
  }

  confirmCashPayment(modal: any) {
    // TODO: เรียก API บันทึกการชำระเงิน
    modal.close();
  }

  openQrModal(content: any) {
    if (!this.currentCart.length) return;
    this.isQrLoading = true;
    this.qrError = '';
    this.qr = {
      invoiceNo: undefined,
      amount: undefined,
      imageDataUrl: undefined,
      expiresAt: undefined,
    };

    // เตรียมข้อมูลส่งให้ BE ตามที่คุณต้องการ (เช่น invoiceNo จาก preview)
    const payload = {
      invoiceNo: this.invoiceNo ?? null,
      amount: this.totalAfterDiscount, // ให้ BE ยืนยัน/คำนวณซ้ำได้
      // เติมข้อมูลลูกค้า/ร้าน ถ้าต้องการ
    };

    // เปิดโมดัลทันที (โชว์ spinner ไว้ก่อน)
    const modalRef = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.paymentService.generateQr(payload).subscribe({
      next: (res: ApiResponse) => {
        const data = (res?.data || {}) as GenerateQrResponse;

        this.qr.invoiceNo = data.invoiceNo;
        this.qr.amount = data.amount ?? this.totalAfterDiscount;
        this.qr.expiresAt = data.expiresAt;
        this.qr.imageDataUrl = `data:${data.contentType};base64,${data.imageBase64}`;
        if (!this.qr.imageDataUrl) {
          this.qrError = 'ไม่พบรูป QR จากเซิร์ฟเวอร์';
        }
      },
      error: (err: any) => {
        console.error(err);
        this.qrError = 'สร้าง QR ไม่สำเร็จ กรุณาลองใหม่';
      },
      complete: () => {
        this.isQrLoading = false;
      },
    });
  }

  confirmQrPaid(modal: any) {
    // ภายหลัง: call finalize / ตรวจสถานะจ่าย / ออกใบเสร็จ
    modal.close();
  }
}
