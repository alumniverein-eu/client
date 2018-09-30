import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Globals } from '@helpers/globals';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient,
              private globals: Globals){}

  public get<T>(endpoint: string) {
    return this.http.get<T>(this.globals.apiUrl + endpoint);
  }

  public post<T>(endpoint: string, body: FormData) {
    return this.http.post<T>(this.globals.apiUrl + endpoint, body);
  }

  public patch<T>(endpoint: string, body: FormData) {
    body.append('_method', 'PATCH');
    return this.http.patch<T>(this.globals.apiUrl + endpoint, body);
  }

  public delete<T>(endpoint: string, body: FormData) {
    //body.append('_method', 'DELETE');
    return this.http.delete<T>(this.globals.apiUrl + endpoint);
  }
}
