import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item, GetRequestOptions } from './manager';

@Injectable({ providedIn: 'root' })
export class ManagerService {
  private apiUrl = 'api/items';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) {}

  getItems(options: GetRequestOptions): Observable<Item[]> {
    const url = options.query ? `${this.apiUrl}?title=^${options.query}` : this.apiUrl;

    return this.http.get<Item[]>(url).pipe(
      map((result : Item[]) => {
        let filteredResult: Item[] = result;

        if (options.sort && options.sort.type) {
          filteredResult = _.orderBy(filteredResult, [options.sort.field], [options.sort.type]);
        }

        if (Number.isInteger(options.limit) && Number.isInteger(options.offset)) {
          filteredResult = filteredResult.slice(options.offset, Number(options.offset) + Number(options.limit));
        }


        return filteredResult;
      }))
  }

  getFavoriteItems(): Observable<Item[]> {
    const url = `${this.apiUrl}?isFavorite=true`;

    return this.http.get<Item[]>(url).pipe(
      map((result : Item[]) => {
        return result;
      }));
  }

  updateItem(id: number, item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.put<Item>(url, item, this.httpOptions);
  }
}
