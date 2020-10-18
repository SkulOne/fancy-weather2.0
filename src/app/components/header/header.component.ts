import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from '../../shared/services/image.service';
import { WeatherService } from '../../shared/services/weather.service';
import { LocationService } from '../../shared/services/location.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() backgroundChange = new EventEmitter<string>();
  isLoading = true;
  form: FormGroup;

  constructor(
    private imageService: ImageService,
    private weatherService: WeatherService,
    private locationsService: LocationService
  ) {
    this.form = new FormGroup({
      query: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const place: PlaceResult = this.form.value.query;
      this.locationsService.setBounds(place.geometry.viewport);
      this.locationsService.setCoords(of({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }));
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
