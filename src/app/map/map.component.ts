import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../shared/services/location.service';
import { Coords } from '../shared/interfaces/coords';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  coords: Observable<Coords>;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  constructor(private locationService: LocationService) {
    // todo исправить костыль
    this.locationService.coordsTrigger.subscribe((value) => {
      value.subscribe((coords) => {
        this.map.panTo(coords);
      });
    });
    this.locationService.coordsTrigger.next(this.locationService.getUserCoords());
  }

  ngOnInit(): void {}
}
