import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './components/weather/weather.component';
import { DayDetailComponent } from './components/weather/day-detail/day-detail.component';
import { DayShortComponent } from './components/weather/day-short/day-short.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeekDayPipe } from './shared/pipes/week-day.pipe';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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
    ShareButtonsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8',
      libraries: ['places'],
      language: 'en',
    }),
    MatGoogleMapsAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
  exports: [MapComponent],
})
export class AppModule {}
