import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Weather } from '../../shared/interfaces/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  currentWeather: Weather;
  shortWeather: Weather[];

  constructor(private weatherService: WeatherService) {
    this.weatherService.trigger.subscribe((weather) => {
      // @ts-ignore
      [this.currentWeather, ...this.shortWeather] = weather;
    });
  }

  ngOnInit(): void {}
}
