import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OffresService {
  private apiUrl = 'https://api.adzuna.com/v1/api';

  constructor(private http : HttpClient) {}


  

}
