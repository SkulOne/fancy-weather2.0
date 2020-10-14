import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';
import { DayDetailComponent } from './weather/day-detail/day-detail.component';
import { DayShortComponent } from './weather/day-short/day-short.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeekDayPipe } from './shared/week-day.pipe';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    DayDetailComponent,
    DayShortComponent,
    HeaderComponent,
    WeekDayPipe,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MapComponent],
})
export class AppModule {}
