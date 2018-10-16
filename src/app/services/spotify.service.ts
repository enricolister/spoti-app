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

  getQuery ( query: string, token ) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.get(url, { headers });
  }

  getToken() {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'dbc5cf4ec79546b7a9df8e6ddaa8d8f9')
      .set('client_secret', '6e2ddb28acba453da7ce8cb6407b6965');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.http.post('https://accounts.spotify.com/api/token', body.toString(), httpOptions);
    // return this.http.get('http://localhost/spot_service/');
  }

  getNewRelases(token) {
    return this.getQuery('browse/new-releases?limit=20', token).pipe( map( data => data['albums'].items ));
  }

  getArtistas(termino: string, token) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`, token).pipe( map( data => data['artists'].items ));
  }

  getArtista(id: string, token) {
    return this.getQuery(`artists/${ id }`, token);
  }
}
