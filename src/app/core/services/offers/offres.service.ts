import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JobOffer } from '../../model/job-offer';
import {environment} from '../../../env';

@Injectable({ providedIn: 'root' })
export class JobService {

  private API_URL = environment.baseUrlUsaJobs;

  constructor(private http: HttpClient) {}

  getJobs(
    page: number,
    opts?: {
      title?: string;
      location?: string;
      resultsPerPage?: number;
    }
  ): Observable<JobOffer[]> {

    let params = new HttpParams()
      .set('Page', page.toString())
      .set('ResultsPerPage', (opts?.resultsPerPage || 10).toString())
      .set('SortField' , 'opendate')
      .set('SortDirection' , 'Desc');

    if (opts?.title) params = params.set('PositionTitle', opts.title);
    if (opts?.location) params = params.set('LocationName', opts.location);
  

    return this.http
      .get<any>(this.API_URL, { params })
      .pipe(
        map(res =>
          res.SearchResult.SearchResultItems.map((item: any) => {
            const jobid = item.MatchedObjectId;
            const job = item.MatchedObjectDescriptor;
            const remuneration = job.PositionRemuneration?.[0];
            
            return {
              id: jobid,
              title: job.PositionTitle,
              company: job.OrganizationName || 'Not specified',
              location: job.PositionLocationDisplay || 'Not specified',
              created: job.PublicationStartDate,
              description: job.UserArea?.Details?.JobSummary || job.QualificationSummary || 'No description available',
              redirectUrl: job.ApplyURI?.[0] || job.PositionURI,
              salary: remuneration
                ? `$${remuneration.MinimumRange} - $${remuneration.MaximumRange} ${remuneration.Description}`
                : 'Not specified'
            } as JobOffer;
          })
        )
      );
  }
}
