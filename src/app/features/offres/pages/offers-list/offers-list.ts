import { Component } from '@angular/core';
import { OffersItem } from '../../components/offers-item/offers-item';

@Component({
  selector: 'app-offers-list',
  imports: [OffersItem],
  templateUrl: './offers-list.html',
  styleUrl: './offers-list.css',
})
export class OffersList {

}
