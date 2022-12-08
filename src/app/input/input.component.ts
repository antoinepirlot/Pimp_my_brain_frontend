import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent {
  @Input() inputControl!: FormControl;
  @Input() nameLabel!: string;
  @Input() placeHolder?: string;
  @Input() type!: string;
  @Input() nameMarkup!: string;
}
