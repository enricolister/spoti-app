import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Spotify Service ready.');
  }

  getToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    this.http.post('https://accounts.spotify.com/api/token', {'grant_type': 'client_credentials', 'client_id': 'dbc5cf4ec79546b7a9df8e6ddaa8d8f9', 'client_secret': '6e2ddb28acba453da7ce8cb6407b6965'}, httpOptions)
    .subscribe( (data: any) => {
      console.log(data.access_token);
      return data.access_token;
    });
  }

  getNewRelases() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + 'BQAwIL0Xikd-brkB6wNzbkE76Nyn2V4NTeKF47oBEEETKSno6XkejwpPoGjP_Pz4N3giXXbk1VQco1OsR5E'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers });
  }
}
