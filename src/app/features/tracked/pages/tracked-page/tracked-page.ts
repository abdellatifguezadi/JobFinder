import { Component, inject } from '@angular/core';
import { TrackedOffersService } from '../../../../core/services/tracked/tracked-offers.service';
import { AsyncPipe } from '@angular/common';
import { TrackedItem } from "../../components/tracked-item/tracked-item";

@Component({
  selector: 'app-tracked-page',
  imports: [AsyncPipe, TrackedItem],
  templateUrl: './tracked-page.html',
  styleUrl: './tracked-page.css'
})
export class TrackedPage {
    service = inject(TrackedOffersService);

    tracked$ = this.service.trackedOffers$;
}
