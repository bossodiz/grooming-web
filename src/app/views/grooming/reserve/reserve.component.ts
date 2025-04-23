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
import { catchError, tap, throwError } from 'rxjs';
import { PetService } from '@/app/services/pet.service';
import { FlatpickrDirective } from '@common/flatpickr.directive';
import { Options } from 'flatpickr/dist/types/options';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { Thai } from 'flatpickr/dist/l10n/th.js';
import { NgxMaskDirective, NGX_MASK_CONFIG, initialConfig } from 'ngx-mask';

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

  data = [
    {
      className: 'event-pastel-1',
      title: 'Grooming',
      start: '2025-04-23T09:00:00',
      end: '2025-04-23T09:45:00',
      extendedProps: {
        id: '1',
        customerId: '1',
        petName: 'Fluffy',
        phone: '123456789',
        petType: 'cat',
        service: 'Full grooming premium package 2',
        tooltip: Tooltip,
      },
    },
    {
      className: 'event-pastel-2',
      title: 'Grooming',
      start: '2025-04-23T10:00:00',
      end: '2025-04-23T11:00:00',
      extendedProps: {
        id: '2',
        customerId: '2',
        petName: 'Buddy',
        phone: '123456789',
        petType: 'cat',
        service: 'grooming',
        tooltip: Tooltip,
      },
    },
    {
      className: 'event-pastel-3',
      title: 'Bathing',
      start: '2025-04-23T11:00:00',
      end: '2025-04-23T12:00:00',
      extendedProps: {
        id: '3',
        customerId: '3',
        petName: 'Mittens',
        phone: '123456789',
        petType: 'dog',
        service: 'bathing',
        tooltip: Tooltip,
      },
    },
    {
      className: 'event-pastel-4',
      title: 'Bathing',
      start: '2025-04-23T14:00:00',
      end: '2025-04-23T15:00:00',
      extendedProps: {
        id: '4',
        customerId: '4',
        petName: 'Max',
        phone: '123456789',
        petType: 'dog',
        service: 'bathing',
        tooltip: Tooltip,
      },
    },
  ];
  colors = [
    {
      backgroundColor: ' #aedff7',
      borderLeft: ' #4fc3f7',
    },
    {
      backgroundColor: ' #c0f2d8',
      borderLeft: ' #4db6ac',
    },
    {
      backgroundColor: ' #fff7ae',
      borderLeft: ' #ffee58',
    },
    {
      backgroundColor: ' #ffd8a8',
      borderLeft: ' #ffb74d',
    },
    {
      backgroundColor: ' #e3d1f9',
      borderLeft: ' #ba68c8',
    },
    {
      backgroundColor: ' #fad4d4',
      borderLeft: ' #e57373',
    },
    {
      backgroundColor: ' #d0f0f7',
      borderLeft: ' #4dd0e1',
    },
    {
      backgroundColor: ' #e6f9af',
      borderLeft: ' #c0ca33',
    },
    {
      backgroundColor: ' #fadadd',
      borderLeft: ' #f48fb1',
    },
    {
      backgroundColor: ' #ffe0cc',
      borderLeft: ' #ffb74d',
    },
  ];

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
        .then((events) => successCallback(events))
        .catch();
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
      if (arg.view.type === 'dayGridMonth') {
        return true; // ใช้ renderer default
      }
      const icon = arg.event.extendedProps['petType'] === 'cat' ? '🐱' : '🐶';
      const name = arg.event.extendedProps['petName'];
      const service = arg.event.extendedProps['service'];
      return {
        html: `
        <div class="event-container">
          <div>${arg.timeText}</div>
          <div style="font-weight: bold;">${icon} ${name}</div>
          <div>${service}</div>
        </div>
        `,
      };
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
    minDate: 'today',
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

    onReady: (selectedDates, dateStr, instance) => {
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
  }

  setupTooltip(info: any) {
    const id = info.event.extendedProps['id'];
    const icon = info.event.extendedProps['petType'] === 'cat' ? '🐱' : '🐶';
    const name = info.event.extendedProps['petName'];
    const phone = info.event.extendedProps['phone'];
    const service = info.event.extendedProps['service'];

    // กำจัด tooltip เก่า (ถ้ามี)
    this.removeTooltip(id);

    const tooltipInstance = new Tooltip(info.el, {
      title: `${icon} ${name}<br>${phone}<br>${service}`,
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
    // ตัวอย่าง mock API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 500);
    });
  }

  createReserve() {
    this.openModal(new Date(), new Date());

    // calendarApi.addEvent(newEvent);
  }
  handleEventClick(arg: EventClickArg) {
    console.log('EventClickArg', arg);
    console.log('Event: ' + arg.event.id);
  }

  handleDateClick(arg: DateClickArg) {
    console.log('DateClickArg', arg);
  }

  handleTimeRangeSelect(arg: DateSelectArg) {
    console.log('DateSelectArg', arg);
  }

  handleEventDragStart(arg: EventDragStartArg) {}

  handleEventDragStop(arg: EventDragStopArg) {}

  openModal(start?: Date, end?: Date) {
    this.sortPetList();
    this.sortPetTypes();
    this.sortBreeds();
    this.reserveForm = this.formBuilder.group({
      start: [start],
      end: [end],
      nameOther: [null],
      grooming: [null],
      breed: [null],
      type: [null],
      pet: [null],
      phone: [''],
    });
    this.modalService.open(this.standardModal, { centered: true });
  }

  reserveForm!: UntypedFormGroup;
  submit!: boolean;
  petList: any[] = [];
  petTypeList: any[] = [];
  breedList: any[] = [];
  filteredBreedList: any[] = [];

  modalclose() {
    this.modalService.dismissAll();
    this.reserveForm.reset();
    this.submit = false;
  }

  onPetChange(item: any) {
    console.log('onPetChange', item);
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
    console.log(this.reserveForm.value);
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
}
