import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Spotify Service ready.');
    this.getToken();
  }


  getToken() {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'dbc5cf4ec79546b7a9df8e6ddaa8d8f9')
      .set('client_secret', '');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.http.post('https://accounts.spotify.com/api/token', body.toString(), httpOptions);
  }

  getNewRelases(token) {
        console.log('Token che usero ' + token);
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers });
  }
}
