import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Coords {
  lat;
  lng;
}

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  coords: Observable<Coords>;
  constructor(private httpClient: HttpClient) {
    this.setUserCoords();
  }

  private setUserCoords(): void {
    this.coords = new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          observer.next(coords);
        }, (error: PositionError) => {
          observer.error(error);
        });
      } else {
        observer.error('Geolocation not available');
      }
    });
  }


  getCity(): Observable<any> {
    const subject = new Subject();
    this.coords.subscribe((coords) => {
      return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8&language=en`)
        .pipe(
          map(locations => {
            return locations.results.find(address => address.types[0] === 'locality').formatted_address;
          }))
        .subscribe(value => subject.next(value));
    });
    return subject.asObservable();
  }

}

// this.getUserCoords().subscribe(
//   map(coords => {
//     console.log(coords);
//     return this.httpClient.get
//     (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},
//     ${coords.lng}&key=AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8&language=en`)
//       .pipe(
//         map((cons) => {
//           // @ts-ignore
//           console.log(cons);
//           const rest = cons.results.filter(address => {
//             return address.types.shift() === 'locality' ? address : null;
//           });
//           return rest.formatted_address;
//         }));
//   }));
