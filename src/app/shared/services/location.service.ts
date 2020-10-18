import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import LatLngBounds = google.maps.LatLngBounds;
import { LatLngLiteral } from '@agm/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _coordsTrigger = new Subject<Observable<LatLngLiteral>>();
  private _boundsTrigger = new Subject<LatLngBounds>();

  constructor() {}

  setCoords(locations: Observable<LatLngLiteral>): void {
    this._coordsTrigger.next(locations);
  }

  setBounds(bounds: LatLngBounds): void {
    this._boundsTrigger.next(bounds);
  }

  get coordsTrigger(): Subject<Observable<LatLngLiteral>> {
    return this._coordsTrigger;
  }

  get boundsTrigger(): Subject<LatLngBounds> {
    return this._boundsTrigger;
  }

  getUserCoords(): Observable<LatLngLiteral> {
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
