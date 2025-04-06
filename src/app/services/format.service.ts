import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'phone_format',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return value;
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // format เป็น xxx-xxx-xxxx
  }
}

@Pipe({
  name: 'date_full'
})
export class DateFullFormatPipe implements PipeTransform {

  private translate = inject(TranslateService);

  transform(date: any, locale: string = this.translate.currentLang): string {
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',     // วัน
      month: 'long',      // เดือน
      year: 'numeric',    // ปี
    });
    let formattedDate = formatter.format(dateObj);
    if (locale === 'th') {
      const year = dateObj.getFullYear();
      const buddhistYear = year + 543; 
      formattedDate = formattedDate.replace(year.toString(), buddhistYear.toString());
    }
    if (locale === 'en') {
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString('en', { month: 'long' });
      const year = dateObj.getFullYear();
      formattedDate = `${day} ${month} ${year}`;
    }
    return formattedDate;
  }
}