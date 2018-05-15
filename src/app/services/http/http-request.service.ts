import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  protected baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient){}

  public get<T>(endpoint: string) {
    return this.http.get<T>(this.baseUrl+endpoint);
  }

  public post<T>(endpoint: string, body: string) {

  }

  public patch<T>(endpoint: string, body: string) {

  }

  public delete<T>(endpoint: string, body: string) {

  }
}
