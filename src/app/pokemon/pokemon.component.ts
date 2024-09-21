import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { PokemonData } from './pokemon.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemons: any[] = [];
  next: string | null = null;
  previous: string | null = null;
  count: number = 0;
  currentPage: number = 1;
  pageSize: number = 40;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }

  fetchPokemons(url?: string): void {
    this.pokemonService.getPokemons(url).subscribe({
      next: (data) => {
        this.pokemons = data.results.map((pokemon: PokemonData) => {
          pokemon.id = this.extractIdFromUrl(pokemon.url);
          return pokemon;
        });
        this.next = data.next;
        this.previous = data.previous;
        this.count = data.count;
      },
      error: (error) => {
        console.error('Error fetching pokemons', error);
      },
    });
  }

  loadNextPage(): void {
    if (this.next) {
      this.currentPage++;
      this.fetchPokemons(this.next);
    }
  }

  loadPreviousPage(): void {
    if (this.previous) {
      this.currentPage--;
      this.fetchPokemons(this.previous);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.count / this.pageSize);
  }

  getImageUrl(pokemonId: number): string {
    return this.pokemonService.getPokemonImage(pokemonId);
  }
}
