import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorService {

  private baseUrl = 'http://192.168.1.22:8000/api';

  constructor(private http: HttpClient) { }
  
}
