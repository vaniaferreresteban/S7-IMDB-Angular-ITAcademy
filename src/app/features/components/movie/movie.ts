import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin } from 'rxjs';

import { Movie } from '../../models/movie';
import { Credits } from '../../models/credits';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink, MatButtonModule, CommonModule],
  templateUrl: './movie.html',
  styleUrl: './movie.scss',
})
export class MovieComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  movie?: Movie;
  IMDBKey: string = environment.IMDBKey;

  getMovie = (id: string): void => {
    const url = 'https://api.themoviedb.org/3/movie/';

    const options = {
      headers: {
        accept: 'application/json',
        Authorization: this.IMDBKey,
      },
    };
    const movieDetails$ = this.httpClient.get<Movie>(url + id, options);
    const movieCredits$ = this.httpClient.get<Credits>(
      url + id + '/credits',
      options,
    );

    forkJoin({
      details: movieDetails$,
      credits: movieCredits$,
    }).subscribe({
      next: (response) => {
        this.movie = {
          ...response.details,
          credits: response.credits,
        };
      },
      error: (error: HttpErrorResponse) => {
        console.error('Ha fallat la crida. Estat:', error.status);
        console.error("Missatge d'error:", error.message);
      },
    });
  };

  getSearchedMovie = (searchTerm: string): void => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=';

    const options = {
      headers: {
        accept: 'application/json',
        Authorization: this.IMDBKey,
      },
    };
    this.httpClient.get<Movie>(url + searchTerm, options).subscribe({
      next: (apiResponse) => {
        const results: Movie = apiResponse;
        this.movie = results;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Ha fallat la crida. Estat:', error.status);
        console.error("Missatge d'error:", error.message);
      },
    });
  };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getMovie(id);
      }
    });
  }
}
