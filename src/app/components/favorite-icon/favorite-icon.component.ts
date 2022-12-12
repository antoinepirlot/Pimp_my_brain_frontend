import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.css']
})
export class FavoriteIconComponent {
  @Input() liked!: boolean

  changeLike() {

  }
}
