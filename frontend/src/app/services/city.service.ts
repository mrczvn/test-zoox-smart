import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly UriApi = 'http://localhost:3000/api/city'

  constructor(private http: HttpClient) { }

    public create(body: City, stateId: string): Observable<void> {
      const uri = `${this.UriApi}/${stateId}`

      return this.http.post(uri, body).pipe(
        map((res) => res),
        catchError(this.errorHandle))
    }

    public load(): Observable<City[]> {
      return this.http.get(this.UriApi).pipe(
        map((res) => res),
        catchError(this.errorHandle))
    }

    public update(body: City, cityId: string): Observable<void> {
      const uri = `${this.UriApi}/${cityId}`

      return this.http.put(uri, body).pipe(
        map((res) => res),
        catchError(this.errorHandle))
    }

    public delete(cityId: string): Observable<void> {
      const uri = `${this.UriApi}/${cityId}`

      return this.http.delete(uri).pipe(
        map((res) => res),
        catchError(this.errorHandle))
    }

      private errorHandle(e: any): Observable<any> {
      console.error(e);

      return EMPTY;
    }
}
