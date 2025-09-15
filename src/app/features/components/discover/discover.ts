import { Component, signal, computed, linkedSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MatButtonModule } from '@angular/material/button';

import { Movie } from '../../models/movie';
import { MovieApiResponse } from '../../models/movieApiResponse';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [RouterLink, InfiniteScrollDirective, MatButtonModule, MatIcon],
  templateUrl: './discover.html',
  styleUrl: './discover.scss',
})
export class Discover {
  IMDBKey: string = environment.IMDBKey;
  headers = {
    accept: 'application/json',
    Authorization: this.IMDBKey,
  };
  private page = signal<number>(1);
  private pageSize = 20;
  url = httpResource<MovieApiResponse>(() => ({
    url: 'https://api.themoviedb.org/3/discover/movie?page=' + this.page(),
    method: 'GET',
    headers: this.headers,
  }));
  isLoading = computed(() => this.url.status() === 'loading');

  canLoadMore = computed(() => {
    const data = this.url.value();
    const status = this.url.status();

    if (status === 'loading') return false;
    if (status === 'error') return true;

    return data?.results?.length === this.pageSize;
  });

  allMovies = linkedSignal<MovieApiResponse | undefined, Movie[]>({
    source: () => this.url.value(),
    computation: (data, previous): Movie[] => {
      const previousMovies = (previous?.value as Movie[]) || [];

      if (data?.results) {
        return this.page() === 1
          ? data.results
          : [...previousMovies, ...data.results];
      }

      return previousMovies;
    },
  });
  loadMore(): void {
    if (!this.canLoadMore()) return;
    this.page.update((p) => p + 1);
  }
}
