import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Spotify Service ready.');
  }

  getNewRelases() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBHO4F1wX9r9uf2_u6Hd7ynBi5yUyEuTNDbMRDmkYd--uKddVGlF7R9d7gkEtBHe4aARLQKVMWYDn_frAg'
    });

    this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers }).subscribe( data => console.log(data));
  }
}
