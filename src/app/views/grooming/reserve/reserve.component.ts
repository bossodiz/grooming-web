import {
  Component,
  effect,
  inject,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import {
  NgbModal,
  NgbTooltip,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventInput,
} from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin, {
  EventDragStartArg,
  EventDragStopArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import thLocale from '@fullcalendar/core/locales/th';
import enLocale from '@fullcalendar/core/locales/es-us';
import { LocaleService } from '@/app/services/locale.service';
import { DateClickArg } from '@fullcalendar/interaction';
import { Tooltip } from 'bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MasterService } from '@/app/services/master.service';
import {
  catchError,
  lastValueFrom,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { PetService } from '@/app/services/pet.service';
import { FlatpickrDirective } from '@common/flatpickr.directive';
import { Options } from 'flatpickr/dist/types/options';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { Thai } from 'flatpickr/dist/l10n/th.js';
import { NgxMaskDirective, NGX_MASK_CONFIG, initialConfig } from 'ngx-mask';
import { ReserveService } from '@/app/services/reserve.service';
import { PhoneFormatPipe } from '@/app/services/format.service';
import { ToastService } from '@/app/services/toast.service';
import { ERROR, SUCCESS } from '@common/constants';

@Component({
  selector: 'app-reserve',
  imports: [
    BreadcrumbComponent,
    FullCalendarModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    CommonModule,
    FlatpickrDirective,
    NgxMaskDirective,
  ],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss',
  providers: [
    {
      provide: NGX_MASK_CONFIG,
      useValue: initialConfig,
    },
    PhoneFormatPipe,
  ],
})
export class ReserveComponent implements OnInit {
  public formBuilder = inject(UntypedFormBuilder);
  private modalService = inject(NgbModal);
  private localeService = inject(LocaleService);
  private masterService = inject(MasterService);
  private tooltipMap = new Map<string, Tooltip>();
  private reserveService = inject(ReserveService);
  private phoneFormatPipe = inject(PhoneFormatPipe);
  toastService = inject(ToastService);

  @ViewChild('calendarRef') calendarComponent!: FullCalendarComponent;
  @ViewChild('standardModal') standardModal!: TemplateRef<any>;

  constructor(private renderer: Renderer2) {
    effect(() => {
      const lang = this.locale();
      if (this.calendarComponent) {
        this.calendarComponent
          .getApi()
          .setOption('locale', lang === 'th' ? 'th' : 'en');
      }
    });
  }

  colorOptions: string[] = [
    'event-pastel-1',
    'event-pastel-2',
    'event-pastel-3',
    'event-pastel-4',
    'event-pastel-5',
    'event-pastel-6',
    'event-pastel-7',
    'event-pastel-8',
    'event-pastel-9',
    'event-pastel-10',
  ];

  selectedColor: string = '';

  locale = this.localeService.getLocale();
  noteForm!: UntypedFormGroup;
  calendarEvents!: EventInput[];
  calendarOptions: CalendarOptions = {
    timeZone: 'Asia/Bangkok',
    locales: [thLocale, enLocale],
    plugins: [
      dayGridPlugin,
      listPlugin,
      interactionPlugin,
      timeGridPlugin,
      multiMonthPlugin,
    ],
    headerToolbar: {
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      center: 'title',
      left: 'prev,next today',
    },
    bootstrapFontAwesome: false,
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: '7 Days',
      day: 'Day',
      list: 'List',
      prev: 'Prev',
      next: 'Next',
    },
    datesSet: (arg) => {
      const calendarApi = arg.view.calendar;
      const today = new Date();
      const todayDay = today.getDay(); // 0-6

      // ถ้าเป็น view week ให้เปลี่ยน firstDay เป็นวันนี้
      if (arg.view.type === 'timeGridWeek') {
        calendarApi.setOption('firstDay', todayDay);
      }

      // ถ้าเป็นเดือนให้ตั้งค่าเริ่มต้นเป็นวันอาทิตย์
      if (arg.view.type === 'dayGridMonth') {
        calendarApi.setOption('firstDay', 0);
      }
    },
    nowIndicator: true,
    editable: true,
    selectable: true,
    eventResizableFromStart: true,
    initialView: 'timeGridWeek',
    slotMinTime: '09:00:00',
    slotMaxTime: '20:00:00',
    slotDuration: '00:30',
    contentHeight: 'auto',
    slotEventOverlap: false,
    navLinks: true,
    events: (info, successCallback, failureCallback) => {
      this.loadEventsFromApi()
        .then((events) => {
          successCallback(events);
        })
        .catch((error) => {
          console.error('Error loading events:', error); // Log error
          failureCallback(error);
        });
    },
    slotLabelFormat: [
      { hour: '2-digit', minute: '2-digit' }, // top level of text
    ],
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
    },
    droppable: true,
    allDaySlot: false,
    eventDisplay: 'list-item',
    eventContent: (arg) => {
      const icon = arg.event.extendedProps['petType'] === '1' ? '🐶' : '🐱';
      const name = arg.event.extendedProps['petName'];
      const service = arg.event.extendedProps['serviceName'];
      if (arg.view.type === 'dayGridMonth') {
        console.log(arg);
        return {
          html: `
          <div class="event-container">
            <div>${icon}${arg.timeText}  ${name} </div>
          </div>
          `,
        };
      } else {
        return {
          html: `
          <div class="event-container">
            <div>${arg.timeText}</div>
            <div style="font-weight: bold;">${icon} ${name} </div>
            <div>${service}</div>
          </div>
          `,
        };
      }
    },
    eventDidMount: (info) => {
      this.setupTooltip(info);
    },
    eventWillUnmount: (info) => {
      this.removeTooltip(info.event.extendedProps['id']);
    },
    eventClick: (info) => this.handleEventClick(info),
    select: (info) => this.handleTimeRangeSelect(info),
    eventDrop: (info) => this.handleEventDrop(info),
    eventResize: (info) => this.handleEventResize(info),
  };

  flatpickrStartOptions: Options = {
    locale: this.locale() === 'th' ? Thai : 'en',
    altInput: true,
    altFormat: 'D d M Y | H:i',
    dateFormat: 'Y-m-d\\TH:i:S',
    enableTime: true,
    time_24hr: true,
    minTime: '09:00',
    maxTime: '19:00',
    plugins: [
      confirmDatePlugin({
        confirmIcon: '', // เปลี่ยน icon
        confirmText: 'ตกลง', // เปลี่ยนข้อความปุ่ม
        showAlways: true, // แสดงปุ่มเฉพาะตอนเปิด popup
        theme: 'light', // หรือ dark
      }),
    ],

    onOpen: [
      (selectedDates, dateStr, instance) => {
        const currentValue = this.reserveForm.get('start')?.value;
        if (!currentValue) {
          const now = new Date();
          instance.setDate(now, true);
        }
      },
    ],

    onReady: (selectedDates, dateStr, instance) => {
      const currentValueStart = this.reserveForm.get('start')?.value;
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
      if (currentValueStart) {
        instance.setDate(currentValueStart, true);
        instance.set('minDate', currentValueStart);
      } else {
        instance.set('minDate', todayStr);
      }
      setTimeout(() => {
        const confirmBtns = document.querySelectorAll(
          '.flatpickr-confirm',
        ) as NodeListOf<HTMLElement>;
        confirmBtns.forEach((btn) => {
          btn.style.cursor = 'pointer';
          btn.style.backgroundColor = '#f8d7da';
          btn.style.color = '#721c24';
          btn.style.padding = '8px 16px';
          btn.style.borderRadius = '12px';
          btn.style.fontSize = '14px';
          btn.style.fontWeight = 'bold';
          btn.style.margin = '8px auto 4px';
          btn.style.display = 'block';
          btn.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          btn.innerHTML = 'ยืนยัน';
          btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#f5c6cb';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '#f8d7da';
          });
        });
      }, 0);
    },
  };

  flatpickrEndOptions: Options = {
    locale: this.locale() === 'th' ? Thai : 'en',
    altInput: true,
    altFormat: 'D d M Y | H:i',
    dateFormat: 'Y-m-d\\TH:i:S',
    enableTime: true,
    time_24hr: true,
    minTime: '09:00',
    maxTime: '19:00',
    plugins: [
      confirmDatePlugin({
        confirmIcon: '', // เปลี่ยน icon
        confirmText: 'ตกลง', // เปลี่ยนข้อความปุ่ม
        showAlways: true, // แสดงปุ่มเฉพาะตอนเปิด popup
        theme: 'light', // หรือ dark
      }),
    ],

    onOpen: [
      (selectedDates, dateStr, instance) => {
        const inputId = (instance.input as HTMLInputElement).id;
        if (inputId === 'datetime-datepicker-start') {
          const currentValue = this.reserveForm.get('start')?.value;
          if (!currentValue) {
            const now = new Date();
            instance.setDate(now, true);
          }
        }
        if (inputId === 'datetime-datepicker-end') {
          const currentValue = this.reserveForm.get('end')?.value;
          if (!currentValue) {
            const now = new Date();
            instance.setDate(now, true);
          }
        }
      },
    ],

    onReady: (selectedDates, dateStr, instance) => {
      const inputId = (instance.input as HTMLInputElement).id;
      const currentValueStart = this.reserveForm.get('start')?.value;
      const currentValueEnd = this.reserveForm.get('end')?.value;
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
      if (inputId === 'datetime-datepicker-start') {
        if (currentValueStart) {
          instance.setDate(currentValueStart, true);
          instance.set('minDate', currentValueStart);
        } else {
          instance.set('minDate', todayStr);
        }
      }
      if (inputId === 'datetime-datepicker-end') {
        if (currentValueEnd) {
          instance.setDate(currentValueEnd, true);
          instance.set('minDate', currentValueEnd);
        } else {
          if (currentValueStart) {
            instance.set('minDate', currentValueStart);
          } else {
            instance.set('minDate', todayStr);
          }
        }
      }
      setTimeout(() => {
        const confirmBtns = document.querySelectorAll(
          '.flatpickr-confirm',
        ) as NodeListOf<HTMLElement>;
        confirmBtns.forEach((btn) => {
          btn.style.cursor = 'pointer';
          btn.style.backgroundColor = '#f8d7da';
          btn.style.color = '#721c24';
          btn.style.padding = '8px 16px';
          btn.style.borderRadius = '12px';
          btn.style.fontSize = '14px';
          btn.style.fontWeight = 'bold';
          btn.style.margin = '8px auto 4px';
          btn.style.display = 'block';
          btn.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          btn.innerHTML = 'ยืนยัน';
          btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#f5c6cb';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '#f8d7da';
          });
        });
      }, 0);
    },
  };

  reserveForm: UntypedFormGroup = this.formBuilder.group({
    id: [null],
    pet: [null, [Validators.required]],
    nameOther: [null],
    type: [null, [Validators.required]],
    breed: [null],
    grooming: [null, [Validators.required]],
    start: [null, [Validators.required]],
    end: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    note: [null],
    color: [null],
  });

  get form() {
    return this.reserveForm.controls;
  }

  submit!: boolean;
  petList: any[] = [];
  petTypeList: any[] = [];
  breedList: any[] = [];
  filteredBreedList: any[] = [];
  showDelete!: boolean;
  confirmBtn!: string;

  ngOnInit(): void {
    this.loadPetList();
    this.loadPetTypes();
    this.loadAllBreeds();
  }

  setupTooltip(info: any) {
    const id = info.event.extendedProps['id'];
    const icon = info.event.extendedProps['petType'] === '1' ? '🐶' : '🐱';
    const name = info.event.extendedProps['petName'] || '';
    const phone =
      this.phoneFormatPipe.transform(info.event.extendedProps['phone']) || '';
    const service = info.event.extendedProps['serviceName'] || '';
    const note = info.event.extendedProps['note'] || '';

    // กำจัด tooltip เก่า (ถ้ามี)
    this.removeTooltip(id);

    const tooltipInstance = new Tooltip(info.el, {
      title: `${icon} ${name} ${icon}<br>${phone}<br>${service}<br>* ${note} *`,
      placement: 'right',
      trigger: 'hover',
      html: true,
    });

    this.tooltipMap.set(id, tooltipInstance);
  }

  removeTooltip(eventId: string) {
    const tooltip = this.tooltipMap.get(eventId);
    if (tooltip) {
      tooltip.dispose(); // ลบ tooltip ทิ้งจาก DOM
      this.tooltipMap.delete(eventId); // ลบออกจาก map
    }
  }

  loadEventsFromApi(): Promise<EventInput[]> {
    return lastValueFrom(this.getData());
  }

  createReserve() {
    this.showDelete = false;
    this.confirmBtn = 'Create';
    this.openModal('createReserve');
  }
  handleEventClick(arg: EventClickArg) {
    var pet = arg.event.extendedProps['pet'];
    var petName = arg.event.extendedProps['petName'];
    if (pet == null) {
      if (this.petList.filter((item) => item.key === pet).length == 0) {
        pet = 'new-' + petName;
        this.petList.push({
          key: pet,
          label: petName,
          value_th: petName,
          value_en: petName,
          ref_key4: 'new',
        });
      }
    }
    this.showDelete = true;
    this.confirmBtn = 'Update reserve';
    this.openModal('handleEventClick', {
      id: arg.event.extendedProps['id'],
      pet: pet,
      petName: petName,
      phone: arg.event.extendedProps['phone'],
      type: arg.event.extendedProps['petType'],
      breed: arg.event.extendedProps['petBreed'],
      service: arg.event.extendedProps['serviceId'],
      note: arg.event.extendedProps['note'],
      start: arg.event.start
        ? arg.event.start.toISOString().slice(0, 19)
        : null,
      end: arg.event.end ? arg.event.end.toISOString().slice(0, 19) : null,
      className: arg.event.classNames[0],
    });
  }

  handleTimeRangeSelect(arg: DateSelectArg) {
    this.confirmBtn = 'Create';
    this.showDelete = false;
    this.openModal('handleTimeRangeSelect', {
      id: null,
      pet: null,
      petName: null,
      phone: null,
      type: null,
      breed: null,
      service: null,
      note: null,
      start: arg.startStr,
      end: arg.endStr,
      className: null,
    });
  }

  handleEventDrop(arg: EventDropArg) {
    this.updateReserve(
      arg.event.extendedProps['id'],
      arg.event.startStr,
      arg.event.endStr,
    );
  }

  handleEventResize(arg: EventResizeDoneArg) {
    this.updateReserve(
      arg.event.extendedProps['id'],
      arg.event.startStr,
      arg.event.endStr,
    );
  }

  openModal(source: string, obj?: any) {
    if (obj) {
      if (obj.type) {
        this.filteredBreedList = this.breedList.filter(
          (b) => b.ref_key === obj.type,
        );
      }
      this.reserveForm.patchValue({
        id: obj.id,
        start: obj.start,
        end: obj.end,
        pet: obj.pet,
        type: obj.type,
        breed: obj.breed,
        grooming: obj.service,
        nameOther: obj.petName,
        phone: obj.phone,
        color: obj.className,
        note: obj.note,
      });
    }
    this.sortPetList();
    this.sortPetTypes();
    this.sortBreeds();
    this.selectedColor = this.reserveForm.get('color')?.value;
    this.modalService.open(this.standardModal, { centered: true });
  }

  modalclose() {
    this.modalService.dismissAll();
    this.reserveForm.reset();
    this.submit = false;
  }

  onPetChange(item: any) {
    if (item) {
      this.reserveForm.patchValue({
        pet: item.key,
        type: item.ref_key,
        breed: item.ref_key2,
        phone: item.ref_key3,
      });
      if (item.ref_key) {
        this.filteredBreedList = this.breedList.filter(
          (b) => b.ref_key === item.ref_key,
        );
        this.sortBreeds();
      }
      if (item.ref_key3) {
        this.onPhoneInput({ target: { value: item.ref_key3 } });
      }

      this.reserveForm.get('type')?.markAsTouched();
      this.reserveForm.get('breed')?.markAsTouched();
    }
  }

  onTypeChange(item: any) {
    if (item) {
      this.filteredBreedList = this.breedList.filter(
        (b) => b.ref_key === item.key,
      );
      this.sortBreeds();
    } else {
      this.filteredBreedList = [];
    }
    this.reserveForm.get('breed')?.setValue('');
    this.reserveForm.get('grooming')?.setValue('');
  }

  sortPetList() {
    this.petList
      .sort((a, b) =>
        this.locale() === 'th'
          ? a.value_th.localeCompare(b.value_th)
          : a.value_en.localeCompare(b.value_en),
      )
      .map((item) => {
        item.label = this.locale() === 'th' ? item.value_th : item.value_en;
        item.label += ' (' + item.ref_key4 + ')';
      });
  }

  sortPetTypes() {
    this.petTypeList
      .sort((a, b) =>
        this.locale() === 'th'
          ? a.value_th.localeCompare(b.value_th)
          : a.value_en.localeCompare(b.value_en),
      )
      .map((item) => {
        item.label = this.locale() === 'th' ? item.value_th : item.value_en;
      });
  }

  sortBreeds() {
    this.breedList
      .sort((a, b) =>
        this.locale() === 'th'
          ? a.value_th.localeCompare(b.value_th)
          : a.value_en.localeCompare(b.value_en),
      )
      .map((item) => {
        item.label = this.locale() === 'th' ? item.value_th : item.value_en;
      });
  }

  addCustomPet = (name: string) => {
    this.reserveForm.get('nameOther')?.setValue(name);
    return {
      key: `new-${name}`,
      label: name,
      value_th: name,
      value_en: name,
    };
  };

  reserve() {
    this.submit = true;
    if (this.reserveForm.invalid) {
      return;
    }
    const color = this.reserveForm.value.color
      ? this.reserveForm.value.color
      : this.colorOptions[Math.floor(Math.random() * this.colorOptions.length)];
    const formData = {
      id: this.reserveForm.value.id,
      pet: this.reserveForm.value.nameOther ? null : this.reserveForm.value.pet,
      nameOther: this.reserveForm.value.nameOther,
      grooming: this.reserveForm.value.grooming,
      breed: this.reserveForm.value.breed,
      type: this.reserveForm.value.type,
      phone: this.reserveForm.value.phone,
      start: this.reserveForm.value.start,
      end: this.reserveForm.value.end,
      color: color,
      note: this.reserveForm.value.note,
    };
    const status = formData.id
      ? 'Successfully update reserve'
      : 'Successfully create reserve';
    this.reserveService
      .reserveGrooming(formData)
      .pipe(
        tap((response) => {
          this.calendarOptions.events = (
            info,
            successCallback,
            failureCallback,
          ) => {
            this.loadEventsFromApi()
              .then(successCallback)
              .catch(failureCallback);
          };
          this.modalclose();
          if (response.code == 200) {
            this.showToast(status, SUCCESS);
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  updateReserve(reserveId: number, start: string, end: string) {
    const formData = {
      id: reserveId,
      start: start,
      end: end,
    };
    this.reserveService
      .updateReserveGrooming(formData)
      .pipe(
        tap((response) => {
          this.calendarOptions.events = (
            info,
            successCallback,
            failureCallback,
          ) => {
            this.loadEventsFromApi()
              .then(successCallback)
              .catch(failureCallback);
          };
          this.modalclose();
          if (response.code == 200) {
            this.showToast('Successfully updated reserve', SUCCESS);
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  deleteReserve() {
    this.reserveService
      .deleteReserveGrooming(this.reserveForm.value.id)
      .pipe(
        tap((response) => {
          this.calendarOptions.events = (
            info,
            successCallback,
            failureCallback,
          ) => {
            this.loadEventsFromApi()
              .then(successCallback)
              .catch(failureCallback);
          };
          this.modalclose();
          if (response.code == 200) {
            this.showToast('Successfully delete reserve', SUCCESS);
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  getData(): Observable<EventInput[]> {
    return this.reserveService.getReserveGrooming().pipe(
      map((response) => response.data ?? []),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  loadPetList() {
    this.masterService
      .getPetList()
      .pipe(
        tap((response) => {
          this.petList = response.data ?? [];
          this.sortPetList();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  loadPetTypes() {
    this.masterService
      .getPetTypes()
      .pipe(
        tap((response) => {
          this.petTypeList = response.data ?? [];
          this.sortPetTypes();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  loadAllBreeds() {
    this.masterService
      .getPetBreeds()
      .pipe(
        tap((response) => {
          this.breedList = response.data ?? [];
          this.sortBreeds();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  onPhoneInput(event: any): void {
    this.submit = false;
    const input = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (input.length <= 3) {
      event.target.value = input;
    } else if (input.length <= 6) {
      event.target.value = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else {
      event.target.value = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.reserveForm.get('color')?.setValue(color); // เซ็ตค่าเป็น class name
  }

  showToast(msg: string, type: string) {
    if (type === SUCCESS) {
      this.toastService.show({
        textOrTpl: msg,
        classname: 'bg-success text-white',
        delay: 3000,
      });
    } else if (type === ERROR) {
      this.toastService.show({
        textOrTpl: msg,
        classname: 'bg-danger text-white',
        delay: 3000,
      });
    }
  }
}
