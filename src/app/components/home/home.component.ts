import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  paises: any[] = [];

  constructor( private http: HttpClient ) {

    this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .subscribe( (results: any) => { // Deve essere dichiarato di tipo any altrimenti results sarebbe di tipo object e non assegnabile ad una variabile any
      this.paises = results;
      console.log(results);
    });
  }

  ngOnInit() {
  }

}
