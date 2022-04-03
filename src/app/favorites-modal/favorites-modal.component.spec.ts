import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

import { FavoritesModal } from './favorites-modal.component';
import {MOCK_DATA} from "../manager";
import {AppComponent} from "../app.component";
import {AppModule} from "../app.module";

describe('FavoritesModalComponent', () => {
  let component: FavoritesModal;
  let fixture: ComponentFixture<FavoritesModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoritesModal,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            items: MOCK_DATA,
            updateItem: () => {},
          },
        },
      ],
      imports: [
        AppModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display items', () => {
    component.items = MOCK_DATA;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-test-id="favorites-list-row"]').length).toEqual(5);
  });

  it('should remove from favs', fakeAsync(() => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const removeFavoritesButton = compiled.querySelector('[data-test-id="favorites-remove-button"]') as HTMLButtonElement;

    removeFavoritesButton.click();

    tick(1000);
    fixture.detectChanges();

    expect(component.items.length).toEqual(MOCK_DATA.length - 1);
    expect(component.data.items.length).toEqual(MOCK_DATA.length - 1);
  }));
});
