import { Component, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

}
