import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Coords } from '../interfaces/coords';
import LatLngBounds = google.maps.LatLngBounds;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _coordsTrigger = new Subject<Observable<Coords>>();
  private _boundsTrigger = new Subject<LatLngBounds>();

  constructor() {}

  setCoords(locations: Observable<Coords>): void {
    this._coordsTrigger.next(locations);
  }

  setBounds(bounds: LatLngBounds): void {
    this._boundsTrigger.next(bounds);
  }

  get coordsTrigger(): Subject<Observable<Coords>> {
    return this._coordsTrigger;
  }

  get boundsTrigger(): Subject<LatLngBounds> {
    return this._boundsTrigger;
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
