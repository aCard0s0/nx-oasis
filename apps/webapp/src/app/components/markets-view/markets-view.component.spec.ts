import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsViewComponent } from './markets-view.component';

describe('MarketsViewComponent', () => {
  let component: MarketsViewComponent;
  let fixture: ComponentFixture<MarketsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
