import { PetService } from '@/app/services/pet.service';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import {
  PhoneFormatPipe,
  DateFullFormatPipe,
} from '../../../../services/format.service';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PetDetail } from '@/app/services/model';
import { LocaleService } from '@/app/services/locale.service';
import { MasterService } from '@/app/services/master.service';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-pet-detail',
  imports: [
    BreadcrumbComponent,
    NgbNavModule,
    DateFullFormatPipe,
    PhoneFormatPipe,
    TranslateModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
  ],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.scss',
})
export class PetDetailComponent implements OnInit {
  private petService = inject(PetService);
  private route = inject(ActivatedRoute);
  public translate = inject(TranslateService);
  private localeService = inject(LocaleService);
  private router = inject(Router);
  private modalService = inject(NgbModal);
  public formBuilder = inject(UntypedFormBuilder);
  private masterService = inject(MasterService);

  locale = this.localeService.getLocale();
  petId: string | null = null;
  petDetail: PetDetail = {};
  petForm!: UntypedFormGroup;
  submit!: boolean;
  selectType!: string;
  nameError!: string;
  breedList: any[] = [];
  petTypeList: any[] = [];
  filteredBreedList: any[] = [];
  @ViewChild('standardModal') standardModal!: TemplateRef<any>;
  ageMonthError!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.petId = params.get('id');
      if (this.petId) {
        this.getData();
      }
    });
    this.loadPetTypes();
    this.loadAllBreeds();
  }

  get form() {
    return this.petForm.controls;
  }

  getData() {
    if (this.petId) {
      this.petService
        .getPetId(Number(this.petId))
        .pipe(
          tap((response: any) => {
            this.petDetail = response.data as PetDetail;
          }),
          catchError((error) => {
            return throwError(() => error);
          }),
        )
        .subscribe();
    }
  }
  goToEditPet() {
    if (this.petId) {
      this.openModal();
      this.petForm.patchValue({});

      // window.location.href = `/members/pets/edit/${this.petId}`;
    }
  }
  goToCustomer() {
    if (this.petDetail.customerId) {
      this.router.navigate([
        `/member/customers/detail`,
        this.petDetail.customerId,
      ]);
    }
  }

  openModal() {
    this.petForm = this.formBuilder.group({
      name: [this.petDetail.name, [Validators.required]],
      ageYear: [this.petDetail.ageYear],
      ageMonth: [this.petDetail.ageMonth, [Validators.max(11)]],
      gender: [this.petDetail.gender],
      type: [this.petDetail.typeId],
      breed: [this.petDetail.breedId],
      weight: [this.petDetail.weight],
    });

    this.filteredBreedList = this.breedList.filter(
      (b) => b.ref_key === this.petDetail.typeId,
    );
    this.sortBreeds();
    this.modalService.open(this.standardModal, { centered: true });
  }

  modalclose() {
    this.modalService.dismissAll();
    this.petForm.reset();
    this.submit = false;
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

  save() {
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
      id: this.petDetail.id,
      name: this.petForm.get('name')?.value,
      ageYear: Number(this.petForm.get('ageYear')?.value),
      ageMonth: Number(this.petForm.get('ageMonth')?.value),
      gender: this.petForm.get('gender')?.value,
      type: Number(this.petForm.get('type')?.value),
      breed: Number(this.petForm.get('breed')?.value),
      customerId: Number(this.petDetail.customerId),
      weight: this.petForm.get('weight')?.value,
    };
    this.petService
      .updatePet(formData)
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
