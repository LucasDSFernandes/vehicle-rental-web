import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Constants
import { environment } from '../../environments/environment';

// Models
import { Search } from '../models/search.model';
import { Result } from '../models/result.model';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private root = `${environment.api}/rental`;

  constructor(private http: HttpClient) { }

  search(search: Search): Observable<Result> {
    return this.http.post<Result>(`${this.root}/search`, search);
  }

  register(search: Search, vehicle: Vehicle): Observable<boolean> {
    return this.http.post<boolean>(`${this.root}/register`, { search, vehicle } );
  }

}
