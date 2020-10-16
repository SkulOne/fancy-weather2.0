import { Component, OnInit } from '@angular/core';
import { LocationService } from '../shared/services/location.service';
import { Coords } from '../shared/interfaces/coords';
import LatLngBounds = google.maps.LatLngBounds;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  coords: Coords;
  bounds: LatLngBounds;

  constructor(private locationService: LocationService) {
    // todo исправить костыль
    this.locationService.coordsTrigger.subscribe((value) => {
      value.subscribe((coords) => {
        this.coords = coords;
      });
    });
    this.locationService.coordsTrigger.next(this.locationService.getUserCoords());
    this.locationService.boundsTrigger.subscribe((value) => (this.bounds = value));
  }

  ngOnInit(): void {}
}
