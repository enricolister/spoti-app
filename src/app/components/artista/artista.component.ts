import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { HomeComponent } from '../../components/home/home.component';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) {

    this.loading = true;

    if (HomeComponent.token === undefined) {
      console.log('Recupero il Token');
      this.spotify.getToken()
      .subscribe( (data: any) => {
        HomeComponent.token = data.access_token;
        console.log('ho salvato il token: ' + HomeComponent.token);

        this.router.params.subscribe( params => {
        this.getArtista(params.id, HomeComponent.token);
        this.getTopTracks(params.id, HomeComponent.token);
      });
      });
    } else {
      this.router.params.subscribe( params => {
      this.getArtista(params.id, HomeComponent.token);
      this.getTopTracks(params.id, HomeComponent.token);
      });
    }
  }

  getArtista(id: string, token) {
    // console.log(token);
    this.spotify.getArtista(id, token).subscribe( artista => {
      this.loading = false;
      this.artista = artista;
    });
  }

  getTopTracks(id: string, token) {
    this.spotify.getTopTracks(id, token)
    .subscribe(topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }

}
