import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly UriApi = 'http://localhost:3000/api/state'

  constructor(private http: HttpClient) { }

  public create(body: State): Observable<void> {
    return this.http.post(this.UriApi, body).pipe(
      map((res) => res),
      catchError(this.errorHandle)
    )
  }

  public load(): Observable<State[]> {
    return this.http.get(this.UriApi).pipe(
      map((res) => res),
      catchError(this.errorHandle)
    )
  }

  public update(body: State, stateId: string): Observable<void> {
    const uri = `${this.UriApi}/${stateId}`

    return this.http.put(uri, body).pipe(
      map((res) => res),
      catchError(this.errorHandle)
    )
  }

  public delete(stateId: string): Observable<void> {
    const uri = `${this.UriApi}/${stateId}`

    return this.http.delete(uri).pipe(
      map((res) => res),
      catchError(this.errorHandle)
    )
  }

  private errorHandle(e: any): Observable<any> {
    console.error(e);
    return EMPTY;
  }
}
