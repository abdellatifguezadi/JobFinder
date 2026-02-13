import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleText } from './title-text';

describe('TitleText', () => {
  let component: TitleText;
  let fixture: ComponentFixture<TitleText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
