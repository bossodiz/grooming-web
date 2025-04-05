import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return value;
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // format เป็น xxx-xxx-xxxx
  }
}
