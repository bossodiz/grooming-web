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
  EventInput,
} from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin, {
  EventDragStartArg,
  EventDragStopArg,
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
  private translate = inject(TranslateService);
  private masterService = inject(MasterService);
  private petService = inject(PetService);
  private tooltipMap = new Map<string, Tooltip>();
  private reserveService = inject(ReserveService);
  private phoneFormatPipe = inject(PhoneFormatPipe);

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
    initialView: 'timeGridWeek',
    slotMinTime: '09:00:00',
    slotMaxTime: '20:00:00',
    slotDuration: '00:15',
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
    droppable: true,
    allDaySlot: false,
    eventClick: (arg) => this.handleEventClick(arg),
    dateClick: (arg) => this.handleDateClick(arg),
    select: (arg) => this.handleTimeRangeSelect(arg),
    eventDisplay: 'list-item',
    eventContent: (arg) => {
      const icon = arg.event.extendedProps['petType'] === '1' ? '🐶' : '🐱';
      const name = arg.event.extendedProps['petName'];
      const service = arg.event.extendedProps['serviceName'];
      if (arg.view.type === 'dayGridMonth') {
        return {
          html: `
          <div class="event-container" style="display: flex; align-items: left;">
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
    eventDragStart: (info) => {
      this.removeTooltip(info.event.extendedProps['id']);
    },
    eventDragStop: (info) => {
      this.removeTooltip(info.event.extendedProps['id']);
    },
  };

  flatpickrOptions: Options = {
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
        if (currentValueStart) {
          instance.setDate(currentValueEnd, true);
          instance.set('minDate', currentValueEnd);
        } else {
          instance.set('minDate', todayStr);
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

  ngOnInit(): void {
    this.loadPetList();
    this.loadPetTypes();
    this.loadAllBreeds();
    this.loadGroomingService();
    this.reserveForm = this.formBuilder.group({
      id: [null],
      pet: [null],
      type: [null],
      breed: [null],
      grooming: [null],
      start: [null],
      end: [null],
      phone: [null],
      note: [null],
      color: [null],
    });
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
    this.openModal();

    // calendarApi.addEvent(newEvent);
  }
  handleEventClick(arg: EventClickArg) {
    this.openModal({
      id: arg.event.extendedProps['id'],
      pet: arg.event.extendedProps['pet'],
      petName: arg.event.extendedProps['petName'],
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

  handleDateClick(arg: DateClickArg) {
    console.log('DateClickArg', arg);
  }

  handleTimeRangeSelect(arg: DateSelectArg) {
    console.log('DateSelectArg', arg);
  }

  handleEventDragStart(arg: EventDragStartArg) {}

  handleEventDragStop(arg: EventDragStopArg) {}

  openModal(obj?: any) {
    if (obj) {
      if (obj.type) {
        this.filteredBreedList = this.breedList.filter(
          (b) => b.ref_key === obj.type,
        );
        this.filteredGroomingServiceList = this.groomingServiceList.filter(
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
    this.modalService.open(this.standardModal, { centered: true });
  }

  reserveForm!: UntypedFormGroup;
  submit!: boolean;
  petList: any[] = [];
  petTypeList: any[] = [];
  breedList: any[] = [];
  filteredBreedList: any[] = [];
  groomingServiceList: any[] = [];
  filteredGroomingServiceList: any[] = [];

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
        this.filteredGroomingServiceList = this.groomingServiceList.filter(
          (b) => b.ref_key === item.key,
        );
        this.sortBreeds();
        this.sortGrooming();
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
      this.filteredGroomingServiceList = this.groomingServiceList.filter(
        (b) => b.ref_key === item.key,
      );
      this.sortBreeds();
      this.sortGrooming();
    } else {
      this.filteredBreedList = [];
      this.filteredGroomingServiceList = [];
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

  sortGrooming() {
    this.groomingServiceList.map((item) => {
      item.label = this.locale() === 'th' ? item.value_th : item.value_en;
    });
  }
  // todo fix
  onAddNewPet(term: string) {
    const newPet = {
      key: `new-${term}`, // หรือใช้ uuid ถ้าต้องการ
      label: term,
      value_th: term, // ตั้งค่าตามความเหมาะสม
      value_en: term,
    };

    this.petList = [...this.petList, newPet];
    this.reserveForm.get('pet')?.setValue(newPet.key); // เซ็ตค่าใหม่ให้ทันที
  }

  reserve() {
    this.submit = true;
    if (this.reserveForm.invalid) {
      return;
    }
    const formData = {
      id: this.reserveForm.value.id,
      pet: this.reserveForm.value.pet,
      nameOther: this.reserveForm.value.nameOther,
      grooming: this.reserveForm.value.grooming,
      breed: this.reserveForm.value.breed,
      type: this.reserveForm.value.type,
      phone: this.reserveForm.value.phone,
      start: this.reserveForm.value.start,
      end: this.reserveForm.value.end,
      color: this.reserveForm.value.color,
      note: this.reserveForm.value.note,
    };
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

  loadGroomingService() {
    this.masterService
      .getGroomingServices()
      .pipe(
        tap((response) => {
          this.groomingServiceList = response.data ?? [];
          this.sortGrooming();
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
}
