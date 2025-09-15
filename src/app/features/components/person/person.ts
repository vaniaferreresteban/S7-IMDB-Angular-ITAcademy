import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute/*,RouterLink*/ } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Person } from '../../models/person';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [/*RouterLink */CommonModule],
  templateUrl: './person.html',
  styleUrl: './person.scss'
})
export class PersonComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  person?: Person;
  IMDBKey: string = environment.IMDB_KEY;

  getPerson = (id: string): void => {
    const url = 'https://api.themoviedb.org/3/person/';

    const options = {
      headers: {
        accept: 'application/json',
        Authorization: this.IMDBKey,
      },
    };

    this.httpClient.get<Person>(url + id, options).subscribe({
      next: (apiResponse) => {
        this.person = apiResponse;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Ha fallat la crida. Estat:', error.status);
        console.error("Missatge d'error:", error.message);
      },
    });

  };
  getSearchedPerson = (searchTerm: string): void => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=';

    const options = {
      headers: {
        accept: 'application/json',
        Authorization: this.IMDBKey,
      },
    };
    this.httpClient.get<Person>(url + searchTerm, options).subscribe({
      next: (apiResponse) => {
        this.person = apiResponse;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Ha fallat la crida. Estat:', error.status);
        console.error("Missatge d'error:", error.message);
      },
    });
  };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getPerson(id);
      }
    });
  }


}
