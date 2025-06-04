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
  service_name?: string;
  type?: string;
  service_price?: string;
  details?: string;
}
