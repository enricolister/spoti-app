import { Component } from '@angular/core';
import {SpotifyService } from '../../services/spotify.service';
import { HomeComponent } from '../../components/home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  loading: boolean;
  artistas: any[] = [];

  constructor( private spotify: SpotifyService) {

    if (HomeComponent.token === undefined) {
      console.log('Recupero il Token');
      this.spotify.getToken()
      .subscribe( (data: any) => {
        HomeComponent.token = data.access_token;
      });
    }
  }

  buscar(termino: string) {
    this.loading = true;
    this.spotify.getArtista(termino, HomeComponent.token)
    .subscribe( (data: any) => {
      console.log(data);
      this.artistas = data;
      this.loading = false;
    });
  }
}
