import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackedItem } from './tracked-item';

describe('TrackedItem', () => {
  let component: TrackedItem;
  let fixture: ComponentFixture<TrackedItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackedItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackedItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
