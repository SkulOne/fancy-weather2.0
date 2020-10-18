import { Location } from './location';

export interface Weather {
  weatherStateName: string;
  icon: string;
  temp: number;
  windSpeed: string;
  humidity: number;
  location: Location;
  chanceOfRain: number;
}
