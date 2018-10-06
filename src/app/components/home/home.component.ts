import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  token;
  nuevasCanciones: any[] = [];

  constructor( private spotify: SpotifyService ) {
    this.spotify.getToken()
    .subscribe( (data: any) => {
      this.token = data.access_token;

      this.spotify.getNewRelases(this.token)
    .subscribe( (data2: any) => {
      console.log(data2.albums.items);
      this.nuevasCanciones = data2.albums.items;
    });
    });
  }

  ngOnInit() {
  }

}
