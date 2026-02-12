import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Tracked } from '../../model/tracked';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class TrackedOffersService {
  
  private ApiUrl = 'http://localhost:3000/applications';

  private trackedOffresSubject = new BehaviorSubject<Tracked[]>([]);
  store = inject(Store);

  currentUser$ = this.store.select(selectUser);

  trackedOffers$ = this.trackedOffresSubject.asObservable();



  constructor(private http :  HttpClient){
    this.currentUser$.subscribe(user => {
      if (user) {
        this.allTracked(user.id);
      } else {
        this.trackedOffresSubject.next([]);
      }
    });
  };

  allTracked(userId: number){
    this.http.get<Tracked[]>(`${this.ApiUrl}?userId=${userId}`)
    .subscribe(data => this.trackedOffresSubject.next(data))
  }

  getTracked(offreId : string){
    return this.trackedOffresSubject.getValue()
    .find(o => o.offerId === offreId);
  }


  track(offre : Tracked){
    return this.http.post<Tracked>(this.ApiUrl,offre).pipe(
      tap(saved =>{
        this.trackedOffresSubject.next([
          ...this.trackedOffresSubject.getValue(),
          saved
        ])
      })
    )
  }


  untrack(id : number){
    return this.http.delete(`${this.ApiUrl}/${id}`).pipe(
      tap(()=>{
        this.trackedOffresSubject.next(
          this.trackedOffresSubject.getValue().filter(o => o.id !== id)
        );
      })
    )
  }


}
