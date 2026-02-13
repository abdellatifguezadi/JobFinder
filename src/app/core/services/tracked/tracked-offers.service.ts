import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Tracked } from '../../model/tracked';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class TrackedOffersService {
  
  private ApiUrl = 'http://localhost:3000/applications';

  private trackedOffresSubject = new BehaviorSubject<Tracked[]>([]);
  store = inject(Store);
  private toastService = inject(ToastService);

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
        ]);
        this.toastService.success('Job tracked successfully! ');
      }),
      catchError(error => {
        this.toastService.error('Failed to track job');
        return throwError(() => error);
      })
    )
  }


  untrack(id : number){
    return this.http.delete(`${this.ApiUrl}/${id}`).pipe(
      tap(()=>{
        this.trackedOffresSubject.next(
          this.trackedOffresSubject.getValue().filter(o => o.id !== id)
        );
        this.toastService.success('Job untracked!');
      }),
      catchError(error => {
        this.toastService.error('Failed to untrack job');
        return throwError(() => error);
      })
    )
  }


}
