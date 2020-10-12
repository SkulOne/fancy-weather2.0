import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageService} from '../shared/services/image.service';
import {WeatherService} from '../shared/services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  location: string;
  isLoading = true;
  @Output() backgroundChange = new EventEmitter<string>();

  constructor(private imageService: ImageService, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.weatherService.search(this.location);
  }

  changeBackgroundTrigger(): any {
    this.isLoading = false;
    this.imageService.getRandomImageURL()
      .subscribe((url) => {
        this.backgroundChange.emit(url);
        this.isLoading = true;
      });
  }
}
