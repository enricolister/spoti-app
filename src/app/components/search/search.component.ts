import { Component } from '@angular/core';
import {SpotifyService } from '../../services/spotify.service';
import { HomeComponent } from '../../components/home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

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
    this.spotify.getArtista(termino, HomeComponent.token)
    .subscribe( (data3: any) => {
      console.log(data3.artists.items);
      this.artistas = data3.artists.items;
    });
  }
}
