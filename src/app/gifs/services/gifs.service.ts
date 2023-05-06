import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root' //A partir do Angular 6, por default os serviços são providos no root da aplicação, ou seja, todos os componentes enxergam o serviço sem precisar fazer exportação/importação do serviço nos módulos da aplicação
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private giphyApiKey: string = "eF0IbCIjixDpjLQBCoumP1qVmoZIMATs";
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {

    this.loadLocalStorage();

  }

  get tagsHistory() {
    //Arrays são passados por referência em Javascript, ou seja, se alterar o valor do array recebido, alterará o valor do array na origem também. Por isso utilizado o operador spread ... para retornar uma nova cópia do array, que não afeta o array original
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    this._tagsHistory = this._tagsHistory.filter(x => x.toLowerCase() !== tag.toLowerCase());
    //unshift add o item no inicio e push add o item no fim
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.saveLocalStorage();
  }

  private loadLocalStorage() {

    const storageEnMemoria = localStorage.getItem("history");

    if (storageEnMemoria) {

      this._tagsHistory = JSON.parse(storageEnMemoria);

    }

    if (this._tagsHistory.length > 0) {
      this.searchTag(this.tagsHistory[0]);
    }

  }

  private saveLocalStorage(): void {
    localStorage.setItem("history", JSON.stringify(this._tagsHistory));
  }

  searchTag(tag: string): void {

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.giphyApiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {

        this.gifList = resp.data;



      });

    //Llamada en javascript puro
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=eF0IbCIjixDpjLQBCoumP1qVmoZIMATs&q=chewbacca&limit=10');
    // const data = await resp.json();
    // console.log(data);


  }

}
