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
  pets?: PetDetaile[];
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
  pets?: PetDetaile[];
}
export class PetTableList {
  id?: number;
  name?: string;
  ageYear?: number;
  ageMouth?: number;
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

export class PetDetaile {
  id?: number;
  name?: string;
  age?: string;
  gender?: string;
  breed?: string;
  type?: string;
  weight?: number;
  service?: string;
}
