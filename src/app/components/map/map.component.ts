import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../shared/services/location.service';
import { of } from 'rxjs';
import LatLngBounds = google.maps.LatLngBounds;
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  coords: LatLngLiteral;
  bounds: LatLngBounds;

  constructor(private locationService: LocationService) {
    this.locationService.coordsTrigger.subscribe((value) => {
      value.subscribe((coords) => {
        this.coords = coords;
      });
    });
    this.locationService.setCoords(this.locationService.getUserCoords());
    this.locationService.boundsTrigger.subscribe((value) => (this.bounds = value));
  }

  ngOnInit(): void {}

  setLocation($event: any): void {
    this.locationService.coordsTrigger.next(of($event));
  }
}
