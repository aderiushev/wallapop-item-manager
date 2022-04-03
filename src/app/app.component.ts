import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import * as _ from 'lodash';
import { ManagerService } from './manager.service';
import { Item, GetRequestOptions, GetRequestStrategy } from './manager';
import { FavoritesModal } from "./favorites-modal/favorites-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wallapop-item-manager';
  items: Item[] = [];
  favoriteItems: Item[] = [];
  fetchOptions: {
    options: GetRequestOptions,
    strategy: GetRequestStrategy,
  } = {
    options: {
      limit: 15,
      offset: 0,
    },
    strategy: 'new',
  }
  isLoading: boolean | null = null
  searchValue: string = '';
  onSearchInputChangeDebounced = _.debounce(this.onSearchInputChange, 500);

  constructor(
    public dialog: MatDialog,
    private managerService: ManagerService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems = (
    options: GetRequestOptions = this.fetchOptions.options,
    strategy: GetRequestStrategy = this.fetchOptions.strategy
  ) => {
    this.isLoading = true
    this.managerService.getItems({
      ...this.fetchOptions.options,
      ...options,
    })
      .subscribe({
        next: (items) => {
          if (!_.isEqual(this.items, items)) {
            if (strategy === 'new') {
              this.items = items

            } else if (strategy === 'append') {
              this.items = [...this.items, ...items]
            }
          }
        },
        complete: () => { this.isLoading = false }
      });
  }

  updateItem = (id: number, item: Item) => {
    this.isLoading = true
    this.managerService.updateItem(id, item)
      .subscribe({
        next: (item: Item) => {
          this.items = this.items.map((item2) => item2.id === item.id ? item : item2);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  onSearchInputChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;

    this.searchValue = value

    this.getItems({
      ...this.fetchOptions.options,
      query: value,
    });
  }

  onSearchInputClear() {
    this.searchValue = '';

    this.getItems({
      limit: 5,
      offset: 0,
    });
  }

  onOpenFavoritesModal() {
    this.managerService.getFavoriteItems()
      .subscribe({
        next: (items) => {
          this.dialog.open(FavoritesModal, {
            data: {
              items,
              updateItem: this.updateItem,
            },
          });
        }
      });
  }
}
