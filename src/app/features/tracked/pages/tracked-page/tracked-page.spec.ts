import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackedPage } from './tracked-page';

describe('TrackedPage', () => {
  let component: TrackedPage;
  let fixture: ComponentFixture<TrackedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
