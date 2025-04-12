import {
  Component,
  effect,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import thLocale from '@fullcalendar/core/locales/th';
import enLocale from '@fullcalendar/core/locales/es-us';
import { LocaleService } from '@/app/services/locale.service';
@Component({
  selector: 'app-reserve',
  imports: [BreadcrumbComponent, FullCalendarModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss',
})
export class ReserveComponent implements OnInit {
  public formBuilder = inject(UntypedFormBuilder);
  private modalService = inject(NgbModal);
  @ViewChild('nodeModal') nodeModal!: TemplateRef<any>;
  private localeService = inject(LocaleService);
  @ViewChild('calendarRef') calendarComponent!: FullCalendarComponent;

  constructor() {
    effect(() => {
      const lang = this.locale();
      if (this.calendarComponent) {
        this.calendarComponent
          .getApi()
          .setOption('locale', lang === 'th' ? 'th' : 'en');
      }
    });
  }

  locale = this.localeService.getLocale();
  noteForm!: UntypedFormGroup;
  calendarEvents!: EventInput[];
  calendarOptions: CalendarOptions = {
    locales: [thLocale, enLocale],
    plugins: [
      dayGridPlugin,
      listPlugin,
      interactionPlugin,
      timeGridPlugin,
      multiMonthPlugin,
    ],
    headerToolbar: {
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
    themeSystem: 'bootstrap',
    initialView: 'timeGridWeek',
    slotMinTime: '09:00:00',
    slotMaxTime: '20:00:00',
    slotDuration: '00:15',
    navLinks: true,
    initialEvents: this.calendarEvents,
    slotLabelFormat: [
      { hour: '2-digit', minute: '2-digit' }, // top level of text
    ],
    droppable: true,
    dateClick: (arg) => this.handleDateClick(arg),
    eventDragStart: (arg) => this.handleEventDragStart(arg),
    eventDragStop: (arg) => this.handleEventDragStop(arg),
  };

  ngOnInit(): void {}

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  handleEventDragStart(arg: any) {
    console.log('onEventDragStart', arg.event.title, arg.event.start);
  }
  handleEventDragStop(arg: any) {
    console.log('onEventDragStop', arg.event.title, arg.event.start);
  }
  openModal() {
    this.noteForm = this.formBuilder.group({
      name: [''],
      ageYear: [null],
      ageMonth: [null],
      gender: ['UNKNOWN'],
      type: [null],
      breed: [null],
      weight: [''],
    });
    this.modalService.open(this.nodeModal, { centered: true });
  }
}
