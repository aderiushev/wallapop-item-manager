import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../manager';
import * as _ from "lodash";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

export interface DialogData {
  items: Item[],
  updateItem: (id: number, item: Item) => void
}

@Component({
  selector: 'app-favorites-modal',
  templateUrl: 'favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss'],
})
export class FavoritesModal {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  searchValue: string = '';
  onSearchInputChangeDebounced = _.debounce(this.onSearchInputChange, 500);
  items: Item[];
  page: number = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.items = data.items || [];
  }

  onSearchInputChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;

    this.items = this.data.items.filter((item) => item.title.toLowerCase().startsWith(value));

    this.searchValue = value
  }

  onSearchInputClear() {
    this.searchValue = '';

    this.items = this.data.items;
  }

  onToggleFavorite(e: Event, id: number) {
    const item = this.items.find((item: Item) => item.id === id) as Item;
    const updatedItem = { ...item, isFavorite: !item.isFavorite };

    this.data.updateItem(id, updatedItem);

    this.items = this.items.filter((item) => item.id !== updatedItem.id);
    this.data.items = this.data.items.filter((item) => item.id !== updatedItem.id);

    if (this.paginator && this.paginator.hasPreviousPage() && this.items.length % 5 === 0) {
      this.paginator.previousPage();
    }
  }

  onPageChange(page: PageEvent) {
    this.page = page.pageIndex + 1;
  }
}

