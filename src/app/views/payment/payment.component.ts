import { LocaleService } from '@/app/services/locale.service';
import { PaymentService } from '@/app/services/payment.service';
import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnDestroy,
  TemplateRef,
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
  ManualDiscount,
} from '@/app/services/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatPhone } from '@/app/helper/utils';

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

  manualDiscount = {
    type: null,
    value: null,
    amount: null,
    note: null,
  };

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

  @ViewChild('receiptModal') receiptModalTpl!: TemplateRef<any>;
  receipt: any | null = null;

  canPaymentBtn: boolean = false;

  get canPayment(): boolean {
    if (this.currentCart.length === 0) {
      return false;
    }
    return this.canPaymentBtn;
  }

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
          this.canPaymentBtn = false;
        }),
        switchMap(() =>
          this.paymentService
            .calculatePayment(
              this.currentCart,
              this.invoiceNo ?? undefined,
              this.manualDiscount ?? undefined,
            )
            .pipe(
              finalize(() => {
                this.isCalculateLoading = false;
                this.canPaymentBtn = true;
              }),
            ),
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

  get cartItemCount(): number {
    return this.currentCart.reduce((sum, it) => sum + it.quantity!, 0);
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
    if (!this.customerId) {
      this.petList = [{ key: 0, label: 'ไม่ระบุ' }];
      return;
    }

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
      this.petId = null;
      this.currentCart = [];
      this.selectedItems = [];
      this.selectedTags = new Set<number>();
      this.selectedTagsGrooming = new Set<number>();
      this.selectedTagsPetShop = new Set<number>();
      this.cartChanges$.next();
      this.getPetListByCustomerId();
    }
  }

  customSearchFn(term: string, item: Option): boolean {
    const normalize = (value: string) =>
      value?.toLowerCase().replace(/-/g, '').replace(/\s+/g, '') ?? '';
    return normalize(item.name ?? item.label ?? '').includes(normalize(term));
  }

  onPetChange(item: Option | null) {
    console.log('onPetChange', item);
    if (item && item.key != 0) {
      this.petId = Number(item.key);
      const petTypeId = (item as any).petTypeId as number | undefined | null;
      if (petTypeId != null) this.getGroomingServiceList(petTypeId);
    } else {
      this.getGroomingServiceList(0);
      this.petId = null;
    }
    // reset tags for grooming
    this.selectedTagsGrooming = new Set<number>();
    if (this.selectedShopType === 'GROOMING')
      this.selectedTags = this.selectedTagsGrooming;

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
    this.canPaymentBtn = false;
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
    this.canPaymentBtn = false;
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
    this.canPaymentBtn = false;
    this.cartChanges$.next();
  }

  removeFromCart(key: string): void {
    this.currentCart = this.currentCart.filter((i) => i.key !== key);
    this.shouldScrollToBottom = true;
    this.canPaymentBtn = false;
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
      this.canPaymentBtn = false;
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
    this.canPaymentBtn = false;
    this.cartChanges$.next();
  }

  petName(petId: number): string {
    const pet = this.petList.find((p) => Number(p.key) === petId);
    return pet ? (pet.name ?? pet.label ?? 'ไม่ระบุ') : 'ไม่ระบุ';
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
    this.canPaymentBtn = false;
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
    this.manualDiscount = data?.manualDiscount ?? null;

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

  cashModalClose(modal: any) {
    this.isCashLoading = false;
    modal.dismiss();
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
      this.cashChange = +(received - this.totalAfterDiscount).toFixed(2);
    } else {
      this.cashChange = null;
    }
  }

  applyManualDiscount(): void {
    const val = Number(this.manualDiscount?.value ?? 0);
    if (isNaN(val) || val <= 0) {
      this.manualDiscount!.value = null;
      return;
    }
    this.canPaymentBtn = false;
    this.cartChanges$.next();
  }

  clearManualDiscount(): void {
    this.manualDiscount = {
      type: null,
      value: null,
      amount: null,
      note: null,
    };
    this.canPaymentBtn = false;
    this.cartChanges$.next();
  }

  confirmPayment(modal: any, paymentType: string) {
    this.paymentService
      .confirmPayment({
        invoiceNo: this.invoiceNo ?? '',
        paymentType,
        customerId: this.customerId ?? undefined,
      })
      .subscribe({
        next: (res) => {
          // สร้าง items จาก response หรือ fallback จาก summaryItems ปัจจุบัน
          const items =
            this.summaryItems ??
            [].map((it: any) => ({
              name: it.name,
              quantity: Number(it.quantity ?? 1),
              price: Number(it.price ?? 0),
              total: Number(
                it.total ?? Number(it.price ?? 0) * Number(it.quantity ?? 1),
              ),
              petName: this.petNameFromItem(it),
            }));

          this.receipt = {
            invoiceNo: this.invoiceNo ?? '',
            paidAt: new Date().toISOString(),
            customerName: this.selectedCustomer?.name ?? '',
            customerPhone: formatPhone(this.selectedCustomer?.phone ?? ''),
            items,
            totalBeforeDiscount: Number(this.totalBeforeDiscount ?? 0),
            totalDiscount: Number(this.discountTotal ?? 0),
            totalAfterDiscount: Number(this.totalAfterDiscount ?? 0),
            paymentType: paymentType == 'CASH_PAYMENT' ? 'เงินสด' : 'QR Code',
          };

          // ปิด cash modal เดิม
          modal.close();
          this.isCashLoading = false;
          // เปิด receipt modal
          this.modalService.open(this.receiptModalTpl, {
            size: 'lg',
            centered: true,
            backdrop: 'static',
            keyboard: false,
          });
        },
        error: (err) => {
          console.error('confirmPayment error', err);
        },
        complete: () => {
          modal.close();
        },
      });
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

  closeReceipt(modalRef: any) {
    modalRef.close();
    this.currentCart = [];
    this.selectedItems = [];
    this.cartChanges$.next();
  }

  // ปุ่มพิมพ์
  printReceipt() {
    // พิมพ์เฉพาะโซนใบเสร็จ โดยเปิดหน้าต่างใหม่
    const area = document.getElementById('receipt-area');
    if (!area) {
      window.print(); // fallback
      return;
    }
    const printContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Receipt</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Th SarabunPSK', Arial, sans-serif; padding: 12px; }
          .table { width: 100%; border-collapse: collapse; }
          .table th, .table td { border-bottom: 1px solid #eee; padding: 6px 8px; font-size: 12px; }
          .table tfoot td { font-weight: bold; }
          .text-end { text-align: right; }
          .text-muted { color: #6b7280; }
          hr { border: 0; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>${area.innerHTML}</body>
    </html>`;
    const w = window.open('', '_blank', 'width=800,height=700');
    if (w) {
      w.document.open();
      w.document.write(printContent);
      w.document.close();
      w.focus();
      w.print();
      // w.close(); // จะปิดอัตโนมัติในบางเบราว์เซอร์
    } else {
      window.print();
    }
  }

  printReceiptSlip(widthMm: 58 = 58) {
    if (!this.receipt) {
      window.print(); // fallback
      return;
    }

    const r = this.receipt;
    const storeName = 'Bloom Bloom Paw Grooming';
    const addrLine =
      '528/181 คาซ่าเพรสโต้ดอนเมือง-สรงประภา เขตดอนเมือง แขวงสีกัน กทม. <br>088-241-4554'; // ปรับตามจริง
    const paidAt = new Date(r.paidAt ?? new Date()).toLocaleString('th-TH', {
      hour12: false,
    });
    const payLabel = r.paymentType || 'CASH';

    // แปลงรายการเป็นแถว (ชื่อ • จำนวนxราคา • รวม)
    const itemRows = (r.items ?? [])
      .map((it: any) => {
        const name = it.name + (it.petName ? ` (#${it.petName})` : '');
        const qty = Number(it.quantity ?? 1);
        const price = Number(it.price ?? 0);
        const total = Number(it.total ?? price * qty);
        return `
      <tr>
        <td class="name">${name}</td>
        <td class="qty">${qty}</td>
        <td class="sum">${total.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
      </tr>
    `;
      })
      .join('');

    // HTML สำหรับหน้าพิมพ์สลิป
    const html = `
                  <!doctype html>
                  <html>
                  <head>
                  <meta charset="utf-8">
                  <title>Receipt</title>
                  <style>
                    /* ขนาดหน้าเป็น 58mm หรือ 80mm แบบไร้ขอบ */
                    @page { size: ${widthMm}mm auto; margin: 0; }
                    html, body { margin: 0; padding: 0; }
                    body { width: ${widthMm}mm; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'TH Sarabun New', 'Sarabun', Arial; }
                    .receipt { padding: 6px 6px 10px; }
                    .center { text-align: center; }
                    .right { text-align: right; }
                    .small { font-size: 10px; color: #444; }
                    .title { font-weight: 700; }
                    .info-row {
                      display: flex;
                      justify-content: space-between;
                      font-size: 10px;
                      white-space: nowrap;
                    }
                    .info-row .label {
                      flex: 1; /* ให้ label กินพื้นที่ซ้าย */
                    }
                    .info-row .value {
                      text-align: right;
                      min-width: 120px; /* กำหนดความกว้างฝั่งขวาให้เท่ากันทุกบรรทัด */
                    }
                    hr { border: 0; border-top: 1px dashed #000; margin: 6px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { font-size: 10px; padding: 2px 0; vertical-align: top; }
                    thead th { border-bottom: 1px dashed #000; }
                    tfoot td { padding-top: 4px; }
                    .name { width: 60% }
                    .qty { width: 20%; text-align: right; }
                    .sum { width: 20%; text-align: right; }
                    .totals td { font-size: 10px; }
                    .grand { font-weight: 700; font-size: 12px; }
                    .footer-note { margin-top: 8px; }
                    .qr { text-align: center; margin-top: 6px; }
                    .qr img { width: ${Math.min(widthMm - 18, 40)}mm; } /* จำกัดขนาดรูปให้พอดี */
                  </style>
                  </head>
                  <body onload="window.print()">
                    <div class="receipt">
                      <div class="center title">${storeName}</div>
                      <div class="center small">${addrLine}</div>
                      <hr>
                      <div class="small info-row">
                        <span class="label">เลขที่:</span>
                        <span class="value">${r.invoiceNo ?? ''}</span>
                      </div>
                      <div class="small info-row">
                        <span class="label">วันที่:</span>
                        <span class="value">${paidAt}</span>
                      </div>
                      <div class="small info-row">
                        <span class="label">ลูกค้า:</span>
                        <span class="value">${r.customerName || '-'}</span>
                      </div>
                      <div class="small info-row">
                        <span class="label">เบอร์ติดต่อ:</span>
                        <span class="value">${formatPhone(r.customerPhone || '-')}</span>
                      </div>
                      <hr>

                      <table>
                        <thead>
                          <tr>
                            <th class="name">รายการ</th>
                            <th class="qty">จำนวน</th>
                            <th class="sum">รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${itemRows}
                        </tbody>
                        <tfoot>
                          <tr class="totals">
                            <td colspan="2" class="right">รวมก่อนส่วนลด</td>
                            <td style="text-align:right; white-space:nowrap;">
                              ${Number(r.totalBeforeDiscount ?? 0).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                          ${
                            Number(r.totalDiscount ?? 0) > 0
                              ? `
                          <tr class="totals">
                            <td colspan="2" class="right">ส่วนลด</td>
                            <td style="text-align:right; white-space:nowrap;">
                              -${Number(r.totalDiscount ?? 0).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>`
                              : ''
                          }
                          <tr class="totals grand">
                            <td colspan="2" class="right">ยอดสุทธิ</td>
                            <td style="text-align:right; white-space:nowrap;">
                              ${Number(r.totalAfterDiscount ?? 0).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                          <tr class="totals">
                            <td colspan="2" class="right">ชำระโดย</td>
                            <td style="text-align:right; white-space:nowrap;">${payLabel}</td>
                          </tr>
                        </tfoot>
                      </table>

                      ${
                        this.qr?.imageDataUrl
                          ? `
                      <div class="qr">
                        <img src="${this.qr.imageDataUrl}" alt="QR">
                      </div>`
                          : ''
                      }

                      <hr>
                      <div class="center small footer-note">
                        ขอบคุณที่ใช้บริการ 🐶🐱
                      </div>
                    </div>
                  </body>
                  </html>
                `;

    const w = window.open('', '_blank', `width=800,height=700`);
    if (!w) {
      window.print();
      return;
    }
    w.document.open();
    // แทนที่ placeholder formatPhone ใน template ด้วยผลลัพธ์จริง (เพื่อให้รันใน window ใหม่)
    const phoneFmt = formatPhone
      ? formatPhone(r.customerPhone)
      : r.customerPhone || '';
    w.document.write(
      html.replace(
        '${formatPhone ? formatPhone(r.customerPhone) : r.customerPhone}',
        phoneFmt,
      ),
    );
    w.document.close();
    w.focus();
    // บาง browser จะปิดเองหลังพิมพ์
  }
}
