import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ManagerService } from './manager.service';
import { InMemoryDataService } from "./in-memory-data.service";

describe('ManagerService', () => {
  let service: ManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, {put204: false}
        ),
      ],
    });

    service = TestBed.inject(ManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
