import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageService} from '../shared/services/image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  location: string;
  isLoading = true;
  @Output() backgroundChange = new EventEmitter<string>();

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  onSubmit(value: string): void {
    console.log(value);
  }

  changeBackgroundTrigger(): any {
    this.isLoading = false;
    this.imageService.getRandomImageURL()
      .subscribe((url) => {
        this.backgroundChange.emit(url);
        this.isLoading = true;
      });
  }
}
