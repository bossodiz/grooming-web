import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PetService {
  constructor(private http: HttpClient) {}
}

export class Response {
  code?: string;
  message?: string;
  data?: any;
}
export class PetTableList {
  id?: number;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneOther?: string;
  serviceCount?: number;
  createdDate?: string;
  lastedDate?: string;
}

export class PetDetaile {
  id?: number;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneOther?: string;
  serviceCount?: number;
  createdDate?: string;
  lastedDate?: string;
}
