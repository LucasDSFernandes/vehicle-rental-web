import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Constants
import { environment } from '../../environments/environment';

// Models
import { Category } from '../models/category.model';
import { Manufacturer } from '../models/manufacturer.model';
import { Model } from '../models/model.model';
import { YearFuel } from '../models/yearFuel.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private root = `${environment.api}/utils`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.root}/categories`);
  }

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(`${this.root}/manufacturers`);
  }

  getModels(manufacturerId: string): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.root}/manufacturers/${manufacturerId}/models`);
  }

  getYearsAndFuels(manufacturerId: string, modelId: string): Observable<YearFuel[]> {
    return this.http.get<YearFuel[]>(`${this.root}/manufacturers/${manufacturerId}/models/${modelId}/years_fuels`);
  }
}
