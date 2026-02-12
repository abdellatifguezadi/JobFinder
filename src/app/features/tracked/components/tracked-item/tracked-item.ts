import { Component, input } from '@angular/core';
import { Tracked } from '../../../../core/model/tracked';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracked-item',
  imports: [DatePipe],
  templateUrl: './tracked-item.html',
  styleUrl: './tracked-item.css',
})
export class TrackedItem {
  tracked = input.required<Tracked>();
}
