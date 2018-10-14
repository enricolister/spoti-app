import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public static token;
  nuevasCanciones: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;

    if (HomeComponent.token === undefined) {
      this.spotify.getToken()
      .subscribe( (data: any) => {
        HomeComponent.token = data.access_token;
        this.spotify.getNewRelases(HomeComponent.token)
      .subscribe( (data2: any) => {
        this.nuevasCanciones = data2;
          this.loading = false;
      });
      });
    } else {
      this.spotify.getNewRelases(HomeComponent.token)
      .subscribe( (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      });
    }

  }

  ngOnInit() {
  }

}
