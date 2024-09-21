import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const pokemonModule = () =>import('./pokemon/pokemon-routing.module').then(m => m.PokemonRoutingModule)

const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  { path: 'pokemon', loadChildren: pokemonModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
