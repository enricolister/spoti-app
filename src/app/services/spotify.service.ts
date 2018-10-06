import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor( private http: HttpClient) {
    console.log('Spotify Service ready.');
    this.getToken();
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

    this.http.post('https://accounts.spotify.com/api/token', body.toString(), httpOptions)
    .subscribe( (data: any) => {
      this.token = data.access_token;
      // console.log(this.token);
    });
  }

  getNewRelases() {
    setTimeout(() => {
    console.log('Token che usero ' + this.token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
      return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers });
    }, 1000);

  }
}
