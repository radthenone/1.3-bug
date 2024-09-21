import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  pokemonId!: string;
  pokemonName?: string;
  pokemonImage?: string;
  pokemonDetails?: any;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.pokemonName = navigation.extras.state['pokemonName'];
      this.pokemonImage = navigation.extras.state['pokemonImage'];
    }
  }

  ngOnInit(): void {
    this.pokemonId = this.route.snapshot.params['id'];
    this.getPokemonDetails(this.pokemonId);
  }

  getPokemonDetails(id: string) {
    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe((data) => {
        this.pokemonDetails = data;
      });
    }
  }

  PlayCries(criesTracks: string) {
    let audio = new Audio();
    audio.src = criesTracks;
    audio.load();
    audio.play();
  }

  getGameIndicesVersionNameList(): string {
    return this.pokemonDetails.game_indices
      .map((item: any) => item.version.name)
      .join(', ');
  }

  getTypeNames(): string {
    return (
      this.pokemonDetails?.types
        ?.map((item: any) => item.type.name)
        .join(', ') || 'No types available'
    );
  }

  getVersionsWithImages() {
    const versionsWithImages: { name: string; image: string }[] = [];
    const versions = this.pokemonDetails?.sprites?.versions;

    if (versions) {
      Object.keys(versions).forEach((generation) => {
        const generationVersions = versions[generation];

        Object.keys(generationVersions).forEach((version) => {
          const versionData = generationVersions[version];

          const image =
            versionData.front_default || versionData.back_default || '';

          if (image) {
            versionsWithImages.push({
              name: version,
              image: image,
            });
          }
        });
      });
    }

    return versionsWithImages;
  }
}
