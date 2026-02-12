import { Component, computed, OnInit, signal } from '@angular/core';
import { OffersItem } from '../../components/offers-item/offers-item';
import { JobService } from '../../../../core/services/offers/offres.service';
import { JobOffer } from '../../../../core/model/job-offer';
import { FormsModule } from '@angular/forms';
import { Spinner } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-offers-list',
  imports: [OffersItem, FormsModule, Spinner],
  templateUrl: './offers-list.html',
  styleUrl: './offers-list.css',
})
export class OffersList implements OnInit {
  allJobs = signal<JobOffer[]>([]);
  loading = signal(false);
  
  currentPage = signal(1);
  resultsPerPage = signal(10);
  resultsPerPageOptions = [5, 10, 20, 50];
  searchTitle = signal('');
  searchLocation = signal('');



  constructor(private jobService: JobService) {}

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
          this.loading.set(false);
        }
      });
  }

  onSearch() {
    this.currentPage.set(1);
    this.loadJobs();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadJobs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onResultsPerPageChange() {
    this.currentPage.set(1);
    this.loadJobs();
  }
}
