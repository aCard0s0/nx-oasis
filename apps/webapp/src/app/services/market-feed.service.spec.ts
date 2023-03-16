import { TestBed } from '@angular/core/testing';

import { MarketFeedService } from './market-feed.service';

describe('ExchangeFeedService', () => {
  let service: MarketFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
