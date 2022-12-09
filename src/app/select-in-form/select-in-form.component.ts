import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-in-form',
  templateUrl: './select-in-form.component.html',
  styles: [
  ]
})
export class SelectInFormComponent {
  @Input() nameLabel!: string;
  @Input() optionChosen!: FormControl;
  @Input() options!: string[];
}
