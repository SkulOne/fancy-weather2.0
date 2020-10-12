import {Component, Input, OnInit} from '@angular/core';
import {Weather} from '../../shared/interfaces/weather';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss']
})
export class DayDetailComponent implements OnInit {
  @Input() dayWeather: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
