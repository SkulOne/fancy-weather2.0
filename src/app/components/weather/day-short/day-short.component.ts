import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../../shared/interfaces/weather';
import { DayDetailComponent } from '../day-detail/day-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-day-short',
  templateUrl: './day-short.component.html',
  styleUrls: ['./day-short.component.scss'],
})
export class DayShortComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @Input() dayWeather: Weather;

  ngOnInit(): void {}

  showDetail(): void {
    this.dialog.open(DayDetailComponent, { data: this.dayWeather });
  }
}
