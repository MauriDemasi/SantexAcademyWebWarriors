import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/app/environments/environment';
import { environment } from 'src/app/environments/environment.prod';

import { Observable } from 'rxjs';
import {
  CoordinatorDataLogin,
  volunterData,
  volunterDataLogin,
} from '../models/dataForms.model';
import { coordinatorData } from '../models/dataForms.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  registerVolunteer(userData: volunterData): Observable<any> {
    const url = `${this.apiUrl}/auth/users/register`;
    return this.http.post(url, userData);
  }

  registerCoordinator(userData: coordinatorData | FormData): Observable<any> {
    const url = `${this.apiUrl}/auth/org/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });
    const options = { headers: headers };
    return this.http.post(url, userData);
  }

  loginVolunteer(userData: volunterDataLogin): Observable<any> {
    const url = `${this.apiUrl}/auth/users/login`;
    return this.http.post(url, userData);
  }

  loginCordinator(userData: CoordinatorDataLogin): Observable<any> {
    const url = `${this.apiUrl}/auth/org/login`;
    return this.http.post(url, userData);
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getAuthToken() {
    return this.authToken || localStorage.getItem('authToken') || '';
  }

  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }
}
