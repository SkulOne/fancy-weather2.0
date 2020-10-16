import { Component, OnInit } from '@angular/core';
import { LocationService } from '../shared/services/location.service';
import { Coords } from '../shared/interfaces/coords';
import { WeatherService } from '../shared/services/weather.service';
import { of } from 'rxjs';
import LatLngBounds = google.maps.LatLngBounds;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  coords: Coords;
  bounds: LatLngBounds;

  constructor(private locationService: LocationService, private weatherService: WeatherService) {
    // todo исправить костыль
    this.locationService.coordsTrigger.subscribe((value) => {
      value.subscribe((coords) => {
        console.log(coords);
        this.coords = coords;
      });
    });
    this.locationService.setCoords(this.locationService.getUserCoords());
    this.locationService.boundsTrigger.subscribe((value) => (this.bounds = value));
  }

  ngOnInit(): void {}

  setLocation($event: any): void {
    this.locationService.coordsTrigger.next(of($event));
    this.weatherService.search($event);
  }
}
