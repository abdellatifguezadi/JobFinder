import { Component, inject, input, OnInit } from '@angular/core';
import { JobOffer } from '../../../../core/model/job-offer';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as authSelectore from '../../../../core/store/auth/auth.selectors';
import * as favoritesSelectors from '../../../../core/store/favorites/favorites.selectors';
import * as favoritesActions from '../../../../core/store/favorites/favorites.actions';
import { User } from '../../../../core/model/user';
import { Favorite } from '../../../../core/model/favorite';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers-item',
  imports: [DatePipe, AsyncPipe, RouterLink],
  templateUrl: './offers-item.html',
  styleUrl: './offers-item.css',
})
export class OffersItem implements OnInit {
  job = input.required<JobOffer>();
  store = inject(Store);

  isAuthenticated$: Observable<boolean>;
  isFavorite$!: Observable<boolean>;
  currentUser$: Observable<User | null>;
  favorite$!: Observable<Favorite | undefined>;
  private currentUser: User | null = null;

  constructor(){
    this.isAuthenticated$ = this.store.select(authSelectore.selectAuthenticated);
    this.currentUser$ = this.store.select(authSelectore.selectUser);
    
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.isFavorite$ = this.store.select(favoritesSelectors.selectIsFavorite(this.job().id));
    this.favorite$ = this.store.select(favoritesSelectors.selectFavoriteByJobId(this.job().id));
  }

  toggleFavorite(): void {
    if (!this.currentUser) return;

    this.favorite$.subscribe(favorite => {
      if (favorite) {
        this.store.dispatch(favoritesActions.removeFavorite({ favoriteId: favorite.id }));
      } else {
        this.store.dispatch(favoritesActions.addFavorite({ 
          userId: this.currentUser!.id, 
          jobId: this.job().id,
          title: this.job().title,
          company: this.job().company,
          location: this.job().location
        }));
      }
    }).unsubscribe();
  }
}
