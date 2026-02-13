import { Component, inject, input } from '@angular/core';
import { Tracked } from '../../../../core/model/tracked';
import { DatePipe } from '@angular/common';
import { TrackedOffersService } from '../../../../core/services/tracked/tracked-offers.service';

@Component({
  selector: 'app-tracked-item',
  imports: [DatePipe],
  templateUrl: './tracked-item.html',
  styleUrl: './tracked-item.css',
})
export class TrackedItem {
  tracked = input.required<Tracked>();

  trackedService = inject(TrackedOffersService);

  accept(id:number){
    this.trackedService.updateTrack(id,'accepted').subscribe();
  }

  reject(id:number){
    this.trackedService.updateTrack(id,'rejected').subscribe();
  }

  untrack(id:number){
    this.trackedService.untrack(id).subscribe();
  }

  pending(id:number){
    this.trackedService.updateTrack(id,'pending').subscribe();
  }
}

