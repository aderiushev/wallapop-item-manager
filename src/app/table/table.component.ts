import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Sort } from '@angular/material/sort';
import { GetRequestOptions, GetRequestStrategy, Item } from '../manager';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() getItems: (
    options: GetRequestOptions,
    strategy?: GetRequestStrategy) => void = () => {};
  @Input() updateItem: (id: number, item: Item) => void = () => {};

  columns: string[] = ['image', 'title', 'price', 'actions'];
  expandedElement: Item | null | undefined;

  selector = '.table-container';
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  page = 1;

  constructor() {}

  ngOnInit(): void {}

  onScrollDown() {
    this.getItems({ offset: this.page * 5 }, 'append');

    this.page += 1;
  }

  onToggleFavorite(e: Event, id: number) {
    e.stopPropagation();

    const item = this.items.find((item: Item) => item.id === id);

    if (item) {
      this.updateItem(id, { ...item, isFavorite: !item.isFavorite });
    }
  }

  onSort(sort: Sort) {
    this.getItems({ sort: { field: sort.active, type: sort.direction } });
  }
}
