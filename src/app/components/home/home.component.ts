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
  error: boolean;
  errorMessage: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    if (HomeComponent.token === undefined) {
      this.spotify.getToken()
      .subscribe( (data: any) => {
        HomeComponent.token = data.access_token;
        this.spotify.getNewRelases(HomeComponent.token)
      .subscribe( (data2: any) => {
        this.nuevasCanciones = data2;
          this.loading = false;
      });
      }, ( errorResponse ) => {
        this.error = true;
        this.loading = false;
        this.errorMessage = errorResponse.error.error;
      });
    } else {
      this.spotify.getNewRelases(HomeComponent.token)
      .subscribe( (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, ( errorResponse ) => {
        this.error = true;
        this.loading = false;
        this.errorMessage = errorResponse.error.error;
      });
    }

  }

  ngOnInit() {
  }

}
