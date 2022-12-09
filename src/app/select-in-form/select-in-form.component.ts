import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-in-form',
  template: `
    <label [for]="nameLabel" >{{ nameLabel }}: </label>
    <select [name]="nameLabel" [formControl]="optionChosen">
      <option *ngFor="let option of options"  [value]="option">{{option}}</option>
    </select>
  `,
  styles: [
  ]
})
export class SelectInFormComponent {
  @Input() nameLabel!: string;
  @Input() optionChosen!: FormControl;
  @Input() options!: string[];
}
