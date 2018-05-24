import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  protected baseUrl = 'http://192.168.1.22:8000/api';

  constructor(private http: HttpClient){}

  public get<T>(endpoint: string) {
    return this.http.get<T>(this.baseUrl+endpoint);
  }

  public post<T>(endpoint: string, body: FormData) {
    return this.http.post<T>(this.baseUrl+endpoint, body, { observe: 'response' }).pipe(
        map(response => response.status)
    );
  }

  public patch<T>(endpoint: string, body: FormData) {
    body.append('_method', 'PATCH');
    return this.http.patch<T>(this.baseUrl+endpoint, body, { observe: 'response' }).pipe(
        map(response => console.log(response))
    );
  }

  public delete<T>(endpoint: string, body: FormData) {
    //body.append('_method', 'DELETE');
    return this.http.delete<T>(this.baseUrl+endpoint);
  }
}
