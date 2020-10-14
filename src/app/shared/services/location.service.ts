import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coords } from '../interfaces/coords';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  coordsTrigger = new Subject<Observable<Coords>>();

  constructor(private httpClient: HttpClient) {}

  setCoords(locations: string | Coords): void {
    if (typeof locations === 'string') {
      this.coordsTrigger.next(this.getCityCoords(locations));
    } else {
      this.coordsTrigger.next(of(locations));
    }
  }

  private getCityCoords(city: string): Observable<Coords> {
    return this.httpClient
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8`
      )
      .pipe(
        // @ts-ignore
        map((value) => value.results[0].geometry.location as Coords)
      );
  }

  getUserCoords(): Observable<Coords> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            const coords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            observer.next(coords);
          },
          (error: PositionError) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation not available');
      }
    });
  }
}
