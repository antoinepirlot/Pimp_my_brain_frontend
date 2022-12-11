import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-level-bubbles',
  templateUrl: './level-bubbles.component.html',
  styleUrls: ['./level-bubbles.component.css']
})
export class LevelBubblesComponent {
  @Input() level!:string;

  constructor() {
  }
}
