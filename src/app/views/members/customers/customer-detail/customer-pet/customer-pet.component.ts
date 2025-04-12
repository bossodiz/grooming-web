import { MasterService } from '@/app/services/master.service';
import { MemberService } from '@/app/services/member.service';
import { PetTableList } from '@/app/services/model';
import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, tap, throwError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { PetService } from '@/app/services/pet.service';
import { LocaleService } from '@/app/services/locale.service';

@Component({
  selector: 'app-customer-pet',
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
  ],
  templateUrl: './customer-pet.component.html',
  styleUrl: './customer-pet.component.scss',
})
export class CustomerPetComponent {
  getNameLocale() {
    throw new Error('Method not implemented.');
  }
  private memberService = inject(MemberService);
  private petService = inject(PetService);
  private modalService = inject(NgbModal);
  public formBuilder = inject(UntypedFormBuilder);
  private translate = inject(TranslateService);
  private masterService = inject(MasterService);
  private localeService = inject(LocaleService);
  private router = inject(Router);

  @Input() id: any;
  @ViewChild('standardModal') standardModal!: TemplateRef<any>;
  modalData: any = null;
  petForm!: UntypedFormGroup;
  dataList: PetTableList[] = [];
  filteredBreedList: any[] = [];
  breedList: any[] = [];
  petTypeList: any[] = [];
  submit!: boolean;
  locale = this.localeService.getLocale();
  selectType!: string;
  nameError!: string;
  ageMonthError!: string;

  ngOnInit(): void {
    this.getData();
    this.loadPetTypes();
    this.loadAllBreeds();
  }

  get form() {
    return this.petForm.controls;
  }

  getData() {
    this.memberService
      .getCustomerPet(Number(this.id))
      .pipe(
        tap((response) => {
          this.dataList = response.data ?? [];
          catchError((error) => {
            return throwError(() => error);
          });
        }),
      )
      .subscribe();
  }

  viewDetail(id: number) {
    this.router.navigate([`/member/pets/detail`, id]);
  }

  openModal() {
    this.petForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      ageYear: [null],
      ageMonth: [null, [Validators.max(11)]],
      gender: ['UNKNOWN'],
      type: [null],
      breed: [null],
      weight: [''],
    });
    this.modalService.open(this.standardModal, { centered: true });
  }

  modalclose() {
    this.modalService.dismissAll();
    this.petForm.reset();
    this.submit = false;
  }

  addPet() {
    this.submit = true;
    if (this.petForm.invalid) {
      this.nameError = this.translate.instant('error.require.name');
      this.ageMonthError = this.translate.instant(
        'error.validate.age_month_max',
      );
      this.petForm.markAllAsTouched(); // เพื่อแสดง validation error
      return;
    }
    const formData = {
      name: this.petForm.get('name')?.value,
      ageYear: this.petForm.get('ageYear')?.value,
      ageMonth: this.petForm.get('ageMonth')?.value,
      gender: this.petForm.get('gender')?.value,
      type: this.petForm.get('type')?.value,
      breed: this.petForm.get('breed')?.value,
      customerId: Number(this.id),
    };
    this.petService
      .addPet(formData)
      .pipe(
        tap((response) => {
          this.getData();
          this.modalclose();
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

  onTypeChange(item: any) {
    if (item) {
      this.filteredBreedList = this.breedList.filter(
        (b) => b.ref_key === item.key,
      );
      this.sortBreeds();
    } else {
      this.filteredBreedList = [];
    }
    this.petForm.get('breed')?.setValue('');
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
  validateNumber(event: KeyboardEvent, dot: boolean = false) {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Enter',
    ];

    if (dot) {
      const isNumber = /^[0-9.]$/.test(event.key);
      if (!isNumber && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
      const isDot = event.key === '.';
      const inputElement = event.target as HTMLInputElement;
      if (isDot && inputElement.value.includes('.')) {
        event.preventDefault(); // หากมีจุดทศนิยมอยู่แล้ว ไม่ให้กรอกเพิ่ม
      }
    } else {
      const isNumber = /^[0-9]$/.test(event.key);
      if (!isNumber && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  }
}
