import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule],
  templateUrl: './search-filter.html',
  styleUrl: './search-filter.css',
  standalone: true
})
export class SearchFilter {
  searchTitle = signal('');
  searchLocation = signal('');
  resultsPerPage = signal(10);
  resultsPerPageOptions = [5, 10, 20, 50];

  onSearch = output<{ title: string; location: string }>();
  onResultsPerPageChange = output<number>();

  handleSearch() {
    this.onSearch.emit({
      title: this.searchTitle(),
      location: this.searchLocation()
    });
  }

  handleResultsPerPageChange() {
    this.onResultsPerPageChange.emit(this.resultsPerPage());
  }
}
