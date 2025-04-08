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
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

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
  @Input() id: any;

  @ViewChild('standardModal') standardModal!: TemplateRef<any>;
  modalData: any = null;
  petForm!: UntypedFormGroup;
  private memberService = inject(MemberService);
  private modalService = inject(NgbModal);
  public formBuilder = inject(UntypedFormBuilder);
  private router = inject(RouterModule);
  private translate = inject(TranslateService);
  private masterService = inject(MasterService);
  private langChangeSubscription!: Subscription;

  dataList: PetTableList[] = [];
  filteredBreedList: any[] = [];
  breedList: any[] = [];
  petTypeList: any[] = [];

  submit!: boolean;
  locale!: string;

  selectType!: string;
  nameError!: string;

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.getData();
    this.loadPetTypes();
    this.loadAllBreeds();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.locale = event.lang;
        this.sortPetTypes(); // เรียงใหม่ตามภาษา
        this.sortBreeds(); // เรียง breed ด้วยถ้าต้อง
      },
    );
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
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
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  viewDetail(id: number) {
    console.log(id);
  }

  openModal() {
    this.petForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      ageYear: [null],
      ageMonth: [null],
      gender: [''],
      type: [null],
      breed: [null],
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
      this.nameError = this.translate.instant('customer.pet.name_error');
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
    // this.masterService
    //   .addPet(formData)
    //   .pipe(
    //     tap((response) => {
    //       this.petTypeList = response.data ?? [];
    //       this.sortPetTypes();
    //     }),
    //     catchError((error) => {
    //       return throwError(() => error);
    //     }),
    //   )
    //   .subscribe();
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
    this.filteredBreedList = this.breedList.filter(
      (b) => b.ref_key === item.key,
    );
    this.sortBreeds();
    this.petForm.get('breed')?.setValue('');
  }

  sortPetTypes() {
    this.petTypeList
      .sort((a, b) =>
        this.locale === 'th'
          ? a.value_th.localeCompare(b.value_th)
          : a.value_en.localeCompare(b.value_en),
      )
      .map((item) => {
        item.label = this.locale === 'th' ? item.value_th : item.value_en;
      });
  }

  sortBreeds() {
    this.breedList
      .sort((a, b) =>
        this.locale === 'th'
          ? a.value_th.localeCompare(b.value_th)
          : a.value_en.localeCompare(b.value_en),
      )
      .map((item) => {
        item.label = this.locale === 'th' ? item.value_th : item.value_en;
      });
  }
}
