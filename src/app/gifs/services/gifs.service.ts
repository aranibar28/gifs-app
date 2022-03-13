import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs-inteface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private url: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '3vErn6CohNqvuF64Bq1tx9uCK6FdbSra';
  private _history: string[] = [];
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get history(): string[] {
    return [...this._history];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._history));
    }

    this.http
      .get<SearchGifsResponse>(`${this.url}/search`, { params })
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.results));
      });
  }
}
