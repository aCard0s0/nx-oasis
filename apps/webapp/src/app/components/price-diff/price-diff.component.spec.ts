import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDiffComponent } from './price-diff.component';

describe('PriceDiffComponent', () => {
  let component: PriceDiffComponent;
  let fixture: ComponentFixture<PriceDiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceDiffComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
