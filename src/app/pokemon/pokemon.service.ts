import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getPokemons(url?: string): Observable<any> {
    const apiUrl = url ? url : `${environment.apiUrl}?offset=0&limit=40`;
    return this.http.get<any>(apiUrl, {
      responseType: 'json',
    });
  }
}
