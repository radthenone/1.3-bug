import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonList } from './pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getPokemonImage(pokemonId: number): string {
    const imageUrl = `${environment.pokemonImageUrl}/${pokemonId}.png`;
    return imageUrl ? imageUrl : '';
  }

  getPokemons(url?: string): Observable<PokemonList> {
    const apiUrl = url ? url : `${environment.apiUrl}?offset=0&limit=40`;
    return this.http.get<PokemonList>(apiUrl, {
      responseType: 'json',
    });
  }

  getPokemonDetails(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${id}`);
  }
}
