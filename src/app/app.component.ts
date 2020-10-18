import { Component } from '@angular/core';
import { ImageService } from './shared/services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  backgroundImage: string;
  constructor(private imageService: ImageService) {
    this.imageService.getRandomImageURL().subscribe((value) => {
      this.backgroundImage = value;
    });
  }

  changeBackground(value: string): void {
    this.backgroundImage = value;
  }
}
