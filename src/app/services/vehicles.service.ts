import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Constants
import { environment } from '../../environments/environment';

// Models
import { Category } from '../models/category.model';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private root = `${environment.api}/admin/vehicle`;

  constructor(private http: HttpClient) { }

  getAll(categoryId?: string): Observable<Vehicle[]> {

    let params: HttpParams = new HttpParams();
    if (categoryId !== undefined && categoryId !== null && categoryId !== '') {
      params = params.set('category', categoryId);
    }

    return this.http.get<Vehicle[]>(`${this.root}s`, { params });
  }

  post(vehicle: Vehicle): Observable<boolean> {
    return this.http.post<boolean>(`${this.root}`, vehicle);
  }

  put(vehicle: Vehicle): Observable<boolean> {
    return this.http.put<boolean>(`${this.root}/${vehicle.id}`, vehicle);
  }

  delete(vehicle: Vehicle): Observable<boolean> {
    return this.http.delete<boolean>(`${this.root}/${vehicle.id}`);
  }
}
