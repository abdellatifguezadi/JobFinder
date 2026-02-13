import { Component, inject } from '@angular/core';
import { TrackedOffersService } from '../../../../core/services/tracked/tracked-offers.service';
import { AsyncPipe } from '@angular/common';
import { TrackedItem } from "../../components/tracked-item/tracked-item";
import { RouterLink } from '@angular/router';
import { TitleText } from "../../../../shared/components/title-text/title-text";

@Component({
  selector: 'app-tracked-page',
  imports: [AsyncPipe, TrackedItem, RouterLink, TitleText],
  templateUrl: './tracked-page.html',
  styleUrl: './tracked-page.css'
})
export class TrackedPage {
    service = inject(TrackedOffersService);
    loading = false;

    tracked$ = this.service.trackedOffers$;
}
