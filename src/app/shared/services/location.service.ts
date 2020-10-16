import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Coords } from '../interfaces/coords';
import LatLngBounds = google.maps.LatLngBounds;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  coordsTrigger = new Subject<Observable<Coords>>();
  boundsTrigger = new Subject<LatLngBounds>();

  constructor() {}

  setCoords(locations: Coords): void {
    this.coordsTrigger.next(of(locations));
  }

  setBounds(bounds: LatLngBounds): void {
    this.boundsTrigger.next(bounds);
  }

  getUserCoords(): Observable<Coords> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            console.log(position);
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
