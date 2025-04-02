import { Injectable, signal, TemplateRef } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export type Toast = {
  template?: TemplateRef<any>;
  content?: string;
  classname?: string;
  delay?: number;
  textOrTpl?: string;
  header?: SafeHtml | string;
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(toast: Toast) {
    this.toasts.update((prev) => [...prev, toast]);
  }

  remove(toast: Toast) {
    this.toasts.update((prev) => prev.filter((t) => t !== toast));
  }
}
