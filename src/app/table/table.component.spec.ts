import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { AppModule } from "../app.module";
import { MOCK_DATA } from "../manager";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [TableComponent]
    });

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty', async () => {
    component.items = [];

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-test-id="table-row-empty"]')).toBeTruthy();
  });

  it('should display some items', async () => {
    component.items = MOCK_DATA.slice(0, 5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-test-id="table-row"]').length).toEqual(5);
  });
});
