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

  constructor( private spotify: SpotifyService ) {

    if (HomeComponent.token === undefined) {
      this.spotify.getToken()
      .subscribe( (data: any) => {
        HomeComponent.token = data.access_token;
        this.spotify.getNewRelases(HomeComponent.token)
      .subscribe( (data2: any) => {
        this.nuevasCanciones = data2;
      });
      });
    } else {
      this.spotify.getNewRelases(HomeComponent.token)
      .subscribe( (data: any) => {
        this.nuevasCanciones = data;
      });
    }

  }

  ngOnInit() {
  }

}
