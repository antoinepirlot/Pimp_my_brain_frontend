import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-stars',
  templateUrl: 'input-stars.component.html', 
  styleUrls: ['input-stars.component.css']
})
export class InputStarsComponent {
  @Input() inputControl!: FormControl;

  setRatingNumber(newNumber: number){
    this.inputControl.setValue(newNumber);
  }
}
