import { Component, input } from '@angular/core';
import { JobOffer } from '../../../../core/model/job-offer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offers-item',
  imports: [DatePipe],
  templateUrl: './offers-item.html',
  styleUrl: './offers-item.css',
})
export class OffersItem {
  job = input.required<JobOffer>();
}
