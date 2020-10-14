import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import { WeatherService } from '../shared/services/weather.service';
import { LocationService } from '../shared/services/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  location: string;
  isLoading = true;
  @Output() backgroundChange = new EventEmitter<string>();

  constructor(
    private imageService: ImageService,
    private weatherService: WeatherService,
    private locationsService: LocationService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.weatherService.search(this.location);

    if (/^-?(\d+\.?\d+),\s?-?(\d+\.?\d+)$/.test(this.location)) {
      const coordsArray = this.location.trim().split(/,\s?/);
      this.locationsService.setCoords({ lat: coordsArray[0], lng: coordsArray[1] });
    } else {
      this.locationsService.setCoords(this.location);
    }
  }

  changeBackgroundTrigger(): any {
    this.isLoading = false;
    this.imageService.getRandomImageURL().subscribe((url) => {
      this.backgroundChange.emit(url);
      this.isLoading = true;
    });
  }
}

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
