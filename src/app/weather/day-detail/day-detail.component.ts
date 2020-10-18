import { Component, Inject, Input, OnInit } from '@angular/core';
import { Weather } from '../../shared/interfaces/weather';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss'],
})
export class DayDetailComponent implements OnInit {
  @Input() dayWeather: Weather;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Weather) {
    this.dayWeather = data;
  }

  ngOnInit(): void {}
}
