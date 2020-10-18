import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { combineAll, map, mergeAll } from 'rxjs/operators';
import { Weather } from '../interfaces/weather';
import { Location } from '../interfaces/location';
import { LocationService } from './location.service';
import { LatLngLiteral } from '@agm/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _trigger = new Subject<Weather>();
  private readonly URL = 'http://api.weatherapi.com/v1';
  private readonly KEY = 'key=ca6b98f646f04779950144630202405';
  private readonly AMOUNT_DAYS = 4;

  constructor(private httpClient: HttpClient, private locationService: LocationService) {
    locationService.coordsTrigger.subscribe((coords) => {
      coords.subscribe((value) => this.search(value));
    });
  }

  get trigger(): Subject<Weather> {
    return this._trigger;
  }

  search(locations: LatLngLiteral): void {
    this.getWeather(locations).subscribe((value) => {
      this._trigger.next(value);
    });
  }

  private getWeather(query: LatLngLiteral): Observable<any> {
    const dates: Date[] = this.createDates();
    return forkJoin(
      dates.map((date) =>
        this.httpClient.get(`${this.URL}/forecast.json?${this.KEY}&q=${query.lat},${query.lng}&dt=${date}`)
      )
    ).pipe(
      mergeAll(),
      map((weather) => this.createWeather(weather)),
      combineAll()
    );
  }

  private createDates(): Date[] {
    return [...new Array(this.AMOUNT_DAYS)].map((date, index) => {
      date = new Date();
      date.setDate(date.getDate() + index);
      return date.toISOString().split('T').shift();
    });
  }

  protected createWeather(weatherRequest: any): Weather[] {
    const weatherProperty = weatherRequest.forecast.forecastday[0];
    const location = weatherRequest.location;
    return [
      {
        weatherStateName: weatherProperty.day.condition.text,
        icon: weatherProperty.day.condition.icon,
        temp: weatherProperty.day.avgtemp_c,
        windSpeed: weatherProperty.day.maxwind_kph,
        humidity: weatherProperty.day.avghumidity,
        chanceOfRain: weatherProperty.day.daily_chance_of_rain,
        location: {
          country: location.country,
          date: new Date(weatherProperty.date),
          name: location.name,
          region: location.region,
        } as Location,
      } as Weather,
    ];
  }
}
