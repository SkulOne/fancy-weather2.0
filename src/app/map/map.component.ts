import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../shared/services/location.service';
import { Coords } from '../shared/interfaces/coords';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  coords: Observable<Coords>;

  constructor(private locationService: LocationService) {
    // todo исправить костыль
    this.locationService.coordsTrigger.subscribe((value) => {
      this.coords = value;
    });
    this.locationService.coordsTrigger.next(this.locationService.getUserCoords());
  }

  ngOnInit(): void {}
}
