import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatPaginatorModule } from "@angular/material/paginator";

import { ManagerService } from './manager.service';
import { TableComponent } from './table/table.component';
import { InMemoryDataService } from './in-memory-data.service';
import { AppComponent } from './app.component';
import { FavoritesModal } from './favorites-modal/favorites-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatBadgeModule } from "@angular/material/badge";
import { LazyImageComponent } from './lazy-image/lazy-image.component';


@NgModule({
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
  bootstrap: [AppComponent]
})
export class AppModule { }
