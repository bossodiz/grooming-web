import { CommonModule, DecimalPipe } from '@angular/common'
import {
  Component,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChildren,
  type PipeTransform,
  type QueryList,
} from '@angular/core'

import { FormsModule } from '@angular/forms'
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component'
import { DataTableItems, DataTableItemsType } from './data'
import { TableService } from '@/app/services/table.service'
import { NgbdSortableHeader } from '@common/sortable.directive'

export type SortColumn = keyof DataTableItemsType | ''
export type SortDirection = 'asc' | 'desc' | ''
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0

export type CustomSortEvent = {
  column: SortColumn
  direction: SortDirection
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdCustomSortableHeader {
  @Input() sortable: SortColumn = ''
  @Input() direction: SortDirection = ''
  @Output() sort = new EventEmitter<CustomSortEvent>()

  rotate() {
    this.direction = rotate[this.direction]
    this.sort.emit({ column: this.sortable, direction: this.direction })
  }
}

function search(text: string, pipe: PipeTransform): DataTableItemsType[] {
  return DataTableItems.filter((country) => {
    const term = text.toLowerCase()
    return (
      country.name.toLowerCase().includes(term) ||
      country.name.includes(term) ||
      country.country.includes(term)
    )
  })
}

@Component({
    selector: 'app-datatable',
    imports: [
        NgbPaginationModule,
        CommonModule,
        FormsModule,
        BreadcrumbComponent,
        NgbHighlight,
        NgbdSortableHeader,
    ],
    templateUrl: './datatable.component.html',
    styles: ``
})
export class DatatableComponent {
  filter!: string

  page = 1
  pageSize = 3
  collectionSize = DataTableItems.length
  countries!: DataTableItemsType[]
  basicCountries = DataTableItems.slice(0, 5)
  searchCountries = DataTableItems
  sortCountries = DataTableItems.slice(0, 5)
  Countries = DataTableItems.slice(0, 5)

  records$: Observable<DataTableItemsType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<DataTableItemsType>
  >

  public tableService = inject(TableService<DataTableItemsType>)

  constructor(public pipe: DecimalPipe) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshCountries()
  }

  ngOnInit(): void {
    this.tableService.setItems(DataTableItems, 5)
  }

  onSort({ column, direction }: CustomSortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = ''
      }
    }
    // sorting countries
    if (direction === '' || column === '') {
      this.sortCountries = DataTableItems
    } else {
      this.sortCountries = [...DataTableItems].sort((a, b) => {
        const res = compare(a[column], b[column])
        return direction === 'asc' ? res : -res
      })
    }
  }

  searchfilter() {
    this.searchCountries = search(this.filter, this.pipe)
  }

  refreshCountries() {
    this.countries = DataTableItems.map((country: any) => ({
      ...country,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    )
  }

  refreshSearchCountries() {
    this.searchCountries = DataTableItems.map((country: any) => ({
      ...country,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    )
  }

  onCompleteSort({ column, direction }: CustomSortEvent) {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = ''
      }
    }
    // sorting countries
    if (direction === '' || column === '') {
      this.Countries = DataTableItems
    } else {
      this.Countries = [...DataTableItems].sort((a, b) => {
        const res = compare(a[column], b[column])
        return direction === 'asc' ? res : -res
      })
    }
  }
}
