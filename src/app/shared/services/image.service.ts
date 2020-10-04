import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly URL = 'https://api.unsplash.com';
  private readonly KEY = 'client_id=h4mP-4wa51P8cSyCYVfzNhWbqskv0MtF-IOu1Mj9_Cg';

  constructor(private httpClient: HttpClient) {
  }

  getRandomImageURL(): Observable<string> {
    return this.httpClient.get(`${this.URL}/photos/random/?${this.KEY}&query=city,weather,nature,high-rises&orientation=landscape`)
      .pipe(
        map(response => {
          // @ts-ignore
          return response.urls.full;
        })
      );
  }

}
