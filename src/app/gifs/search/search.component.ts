import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  constructor(private gifsService: GifsService) {}
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  search() {
    const valor = this.txtSearch.nativeElement.value;
    if (valor.trim().length === 0) {
      return;
    }

    this.gifsService.searchGifs(valor);
    this.txtSearch.nativeElement.value = '';
  }
}
