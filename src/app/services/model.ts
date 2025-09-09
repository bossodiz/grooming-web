export class ApiResponse {
  code?: number;
  message?: string;
  data?: any;
}

export class CustomerTableList {
  id?: number;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneOther?: string;
  pets?: PetDetail[];
  serviceCount?: number;
  createdDate?: string;
  lastedDate?: string;
}

export class CustomerDetail {
  id?: number;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneOther?: string;
  serviceCount?: number;
  createdDate?: string;
  lastedDate?: string;
  pets?: PetDetail[];
}
export class PetTableList {
  id?: number;
  name?: string;
  ageYear?: number;
  ageMonth?: number;
  gender?: string;
  genderTh?: string;
  genderEn?: string;
  breed?: string;
  breedNameTh?: string;
  breedNameEn?: string;
  type?: string;
  typeNameTh?: string;
  typeNameEn?: string;
  weight?: number;
  service?: string;
}

export class PetDetail {
  id?: number;
  name?: string;
  ageYear?: number;
  ageMonth?: number;
  gender?: string;
  genderTh?: string;
  genderEn?: string;
  breedId?: number;
  breedNameTh?: string;
  breedNameEn?: string;
  typeId?: number;
  typeNameTh?: string;
  typeNameEn?: string;
  weight?: string;
  service?: string;
  lastedServiceDate?: string;
  customerId?: number;
  customerName?: string;
  customerPhone?: string;
}

export class GroomingServiceTableList {
  id?: number;
  name?: string;
  type?: string;
  price?: string;
  description?: string;
}

export class PromotionTableList {
  id?: number;
  name?: string;
  discountCategory?: string;
  discountType?: string;
  amount?: string;
  amountType?: string;
  periodType?: string;
  periodDate?: string;
  customerOnly?: boolean;
  status?: string;
  quota?: number;
}

export class CartItem {
  key?: string;
  type?: 'G' | 'P';
  petId?: number;
  itemId?: number;
  name?: string;
  price?: number;
  quantity?: number;
  total?: number;
}

export class CartCalculationResult {
  items?: CartItemResult[];
  totalBeforeDiscount?: number;
  totalDiscount?: number;
  totalAfterDiscount?: number;
  warningPromotions?: string[];
  overallPromotion?: AppliedPromotion;
}

export class CartItemResult {
  key?: string;
  type?: 'G' | 'P';
  petId?: number;
  itemId?: number;
  name?: string;
  price?: number;
  quantity?: number;
  total?: number;
  discount?: number;
  finalTotal?: number;
  appliedPromotions?: AppliedPromotion[];
}

export class AppliedPromotion {
  promotionId?: number;
  name?: string;
  discountAmount?: number; // เดิมเป็น string
}

export class GenerateQrResponse {
  invoiceNo?: string;
  amount?: number;
  // รองรับได้หลายรูปแบบจาก BE
  image?: string; // อาจเป็น dataURL หรือ base64 ล้วน
  imageBase64?: string; // base64 ไม่รวม prefix
  contentType?: string; // เช่น "image/png"
  expiresAt?: string; // ISO
}

export class ManualDiscount {
  type?: string;
  value?: number;
  amount?: number;
  note?: string;
}

export class PromotionDetail {
  id?: number;
  name?: string;
  discount_category?: string;
  amount_type?: string;
  amount?: string;
  period_type?: string;
  start_date?: string;
  end_date?: string;
  specific_days?: string;
  customer_only?: boolean;
  status?: boolean;
  quota?: number;
  created_at?: string;
  updated_at?: string;
  discount_type?: string;
  condition?: string;
}

export class PromotionItem {
  selected?: boolean;
  id?: number;
  name?: string;
  description?: string;
  price?: number;
}
