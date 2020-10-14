import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../shared/interfaces/weather';

@Component({
  selector: 'app-day-short',
  templateUrl: './day-short.component.html',
  styleUrls: ['./day-short.component.scss'],
})
export class DayShortComponent implements OnInit {
  constructor() {}

  @Input() dayWeather: Weather;

  ngOnInit(): void {}
}
