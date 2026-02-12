import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../../model/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/favoritesOffers';

  getFavoritesByUserId(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addFavorite(userId: number, jobId: string, title: string, company: string, location: string): Observable<Favorite> {
    const favoriteData = {
      userId,
      offerId: jobId,
      title,
      company,
      location
    };
    return this.http.post<Favorite>(this.apiUrl, favoriteData);
  }

  removeFavorite(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${favoriteId}`);
  }
}
