import { MemberService } from '@/app/services/member.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { catchError, tap, throwError } from 'rxjs';
import { CustomerPetComponent } from './customer-pet/customer-pet.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerAboutComponent } from './customer-about/customer-about.component';
import { CustomerServiceHistoryComponent } from './customer-service-history/customer-service-history.component';
import { CustomerProductHistoryComponent } from './customer-product-history/customer-product-history.component';
import {
  PhoneFormatPipe,
  DateFullFormatPipe,
} from '../../../../services/format.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-detail',
  imports: [
    BreadcrumbComponent,
    NgbNavModule,
    CustomerPetComponent,
    CustomerAboutComponent,
    CustomerServiceHistoryComponent,
    CustomerProductHistoryComponent,
    PhoneFormatPipe,
    DateFullFormatPipe,
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent implements OnInit {
  customerId: string | null = null;
  name!: string;
  phone!: string;
  phoneOther!: string;
  lastedDate!: string;
  createdDate!: string;

  translate = inject(TranslateService);
  route = inject(ActivatedRoute);
  memberService = inject(MemberService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id');
      if (this.customerId) {
        this.getData();
      }
    });
  }

  getData() {
    this.memberService
      .getCustomerId(Number(this.customerId))
      .pipe(
        tap((response) => {
          this.name = response.data?.name ?? '';
          this.phone = response.data?.phone ?? '';
          this.phoneOther = response.data?.phoneOther ?? '';
          this.lastedDate = response.data?.lastedDate ?? '';
          this.createdDate = response.data?.createdDate ?? '';
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
