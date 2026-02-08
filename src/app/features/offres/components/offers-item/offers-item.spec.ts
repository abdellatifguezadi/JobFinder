import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersItem } from './offers-item';

describe('OffersItem', () => {
  let component: OffersItem;
  let fixture: ComponentFixture<OffersItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
