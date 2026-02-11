import { Component, inject, input } from '@angular/core';
import { JobOffer } from '../../../../core/model/job-offer';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as authSelectore from '../../../../core/store/auth/auth.selectors'

@Component({
  selector: 'app-offers-item',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './offers-item.html',
  styleUrl: './offers-item.css',
})
export class OffersItem {
  job = input.required<JobOffer>();
  store = inject(Store);

  isAuthenticated$: Observable<boolean>;

  constructor(){
    this.isAuthenticated$ = this.store.select(authSelectore.selectAuthenticated);
  }
}
