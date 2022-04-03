import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatPaginatorModule } from "@angular/material/paginator";

import { ManagerService } from "./manager.service";
import { InMemoryDataService } from "./in-memory-data.service";
import { FavoritesModal } from "./favorites-modal/favorites-modal.component";
import { LazyImageComponent } from "./lazy-image/lazy-image.component";
import { AppComponent } from './app.component';
import { TableComponent } from "./table/table.component";
import {MOCK_DATA} from "./manager";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TableComponent,
        FavoritesModal,
        LazyImageComponent,
      ],
      imports: [
        MatDialogModule,
        FormsModule,
        InfiniteScrollModule,
        LazyLoadImageModule,
        BrowserModule,
        MatCardModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatInputModule,
        MatListModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, {put204: false}
        ),
        MatSortModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatPaginatorModule,
      ],
      providers: [ManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-test-id="toolbar"]')).toBeTruthy();
  });

  it('should render content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-test-id="content"]')).toBeTruthy();
  });

  it('should search', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[data-test-id="search-input"]') as HTMLInputElement

    input.value = "iphone";
    input.dispatchEvent(new Event('input'));

    tick(1000);

    fixture.detectChanges();

    expect(compiled.querySelectorAll('[data-test-id="table-row"]').length).toEqual(1);
  }));

  it('should toggle favorite', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    tick(1000);
    fixture.detectChanges();

    const favoriteButton = compiled.querySelector('[data-test-id="button-favorite"]') as HTMLButtonElement;
    favoriteButton.click();

    tick(1000);
    fixture.detectChanges();

    const favoriteButton2 = compiled.querySelector('[data-test-id="button-favorite"]') as HTMLButtonElement

    expect(favoriteButton2.classList).toContain('mat-primary');
  }));

  it('should description to get expanded', fakeAsync(async () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    tick(1000);
    fixture.detectChanges();

    const tableRow = compiled.querySelector('[data-test-id="table-row"]') as HTMLTableRowElement;
    tableRow.click();

    fixture.detectChanges();

    expect(tableRow.classList).toContain('expanded-row');
  }));

  it('should load infinite scroll', fakeAsync(async () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    tick(1000);
    fixture.detectChanges();

    const infiniteScroll = compiled.querySelector('[data-test-id="table-container"]') as HTMLDivElement;

    (compiled.querySelector('[data-test-id="table"] tbody tr:last-child') as HTMLTableRowElement).scrollIntoView();
    infiniteScroll.dispatchEvent(new Event('scroll'));

    tick(1000);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('[data-test-id="table-row"]').length).toEqual(10);
  }));

  it('should toggle favorites modal', fakeAsync(async () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    tick(1000);
    fixture.detectChanges();

    const toolbarFavoriteButton = compiled.querySelector('[data-test-id="toolbar-favorite-button"]') as HTMLDivElement;
    toolbarFavoriteButton.click();

    tick(1000);
    fixture.detectChanges();

    const favoritesDialogContent = document.querySelector('[data-test-id="favorites-dialog-content"]') as HTMLDivElement;

    expect(favoritesDialogContent).toBeTruthy();
  }));
});
