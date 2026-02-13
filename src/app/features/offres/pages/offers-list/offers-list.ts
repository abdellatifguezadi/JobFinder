import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { OffersItem } from '../../components/offers-item/offers-item';
import { JobService } from '../../../../core/services/offers/offres.service';
import { JobOffer } from '../../../../core/model/job-offer';
import { FormsModule } from '@angular/forms';
import { Spinner } from '../../../../shared/components/spinner/spinner';
import { SearchFilter } from '../../components/search-filter/search-filter';
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-offers-list',
  imports: [OffersItem, FormsModule, Spinner, SearchFilter],
  templateUrl: './offers-list.html',
  styleUrl: './offers-list.css',
})
export class OffersList implements OnInit {
  private jobService = inject(JobService);
  private toastService = inject(ToastService);

  allJobs = signal<JobOffer[]>([]);
  loading = signal(false);
  
  currentPage = signal(1);
  resultsPerPage = signal(10);
  searchTitle = signal('');
  searchLocation = signal('');

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading.set(true);
    
    this.jobService
      .getJobs(this.currentPage(), {
        title: this.searchTitle() || undefined,
        location: this.searchLocation() || undefined,
        resultsPerPage: this.resultsPerPage(),
      })
      .subscribe({
        next: (jobs) => {
          this.allJobs.set(jobs);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading job offers:', err);
          this.toastService.error('Failed to load job offers. Please try again.');
          this.loading.set(false);
        }
      });
  }

  onSearch(searchParams: { title: string; location: string }) {
    this.searchTitle.set(searchParams.title);
    this.searchLocation.set(searchParams.location);
    this.currentPage.set(1);
    this.loadJobs();
  }

  onResultsPerPageChange(perPage: number) {
    this.resultsPerPage.set(perPage);
    this.currentPage.set(1);
    this.loadJobs();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadJobs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
