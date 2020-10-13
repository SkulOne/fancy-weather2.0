import {Injectable} from '@angular/core';
import {forkJoin, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {combineAll, map, mergeAll, } from 'rxjs/operators';
import {Weather} from '../interfaces/weather';
import {Location} from '../interfaces/location';
import {LocationService} from './location.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private httpClient: HttpClient, private locationService: LocationService) {
    locationService.coords.subscribe(() => {
      locationService.getCity().subscribe(city => {
        this.search(city);
      });
    });
  }

  private readonly URL = 'http://api.weatherapi.com/v1';
  private readonly KEY = 'key=ca6b98f646f04779950144630202405';
  private _trigger = new Subject();
  weather: Observable<Weather>;

  get trigger(): Observable<Weather> {
    // @ts-ignore
    return this._trigger;
  }

  search(city): void {
    this.getWeather(city).subscribe((value) => {
      this._trigger.next(value);
    });
  }

  getWeather(query: string): Observable<any> {
    const dates: Date[] = this.createDates();
    return forkJoin(
      [
        ...dates.map(date => this.httpClient.get(`${this.URL}/forecast.json?${this.KEY}&q=${query}&dt=${date}`))
      ]
    )
      .pipe(
        mergeAll(),
        map((weather) => {
          return this.createWeather(weather);
        }),
        combineAll()
      );
  }

  private createDates(): Date[] {
    return [...new Array(4)]
      .map((date, index) => {
        date = new Date();
        date.setDate(date.getDate() + index);
        return date.toISOString().split('T').shift();
      });
  }

  private createWeather(weatherRequest: any): Weather[] {
    const weatherProperty = weatherRequest.forecast.forecastday[0];
    const location = weatherRequest.location;
    return [{
      weatherStateName: weatherProperty.day.condition.text,
      icon: weatherProperty.day.condition.icon,
      temp: weatherProperty.day.avgtemp_c,
      windSpeed: weatherProperty.day.maxwind_kph,
      humidity: weatherProperty.day.avghumidity,
      location: {
        country: location.country,
        date: new Date(weatherProperty.date),
        lat: location.lat,
        lon: location.lon,
        name: location.name,
        region: location.region,
      } as Location
    } as Weather];
  }
}
