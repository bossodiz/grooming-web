import { LocaleService } from '@/app/services/locale.service';
import { PaymentService } from '@/app/services/payment.service';
import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { catchError, tap, throwError } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [BreadcrumbComponent, NgSelectModule, NgClass],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  private localeService = inject(LocaleService);
  private paymentService = inject(PaymentService);
  locale = this.localeService.getLocale();

  customerList: any[] = [];
  petList: any[] = [];
  tags = [
    { tagId: 1, tagName: 'a' },
    { tagId: 2, tagName: 'b' },
    { tagId: 3, tagName: 'c' },
  ];

  customerId: any = null;
  petId: any = null;
  selectedTags = new Set<number>();

  ngOnInit(): void {
    this.getCustomerList();
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
    } else {
      this.petId = null;
    }
  }

  toggleTag(tagId: number): void {
    if (this.selectedTags.has(tagId)) {
      this.selectedTags.delete(tagId);
    } else {
      this.selectedTags.add(tagId);
    }
  }

  isSelected(tagId: number): boolean {
    return this.selectedTags.has(tagId);
  }
}
