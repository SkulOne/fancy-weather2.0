import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coords, LocationService } from '../shared/services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  coords: Observable<Coords>;

  constructor(private locationService: LocationService) {
    this.coords = locationService.coords;
  }

  ngOnInit(): void {}
}
