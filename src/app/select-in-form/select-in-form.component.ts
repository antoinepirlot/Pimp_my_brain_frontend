import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-in-form',
  template: `
    <label [for]="nameLabel">{{ nameLabel }}: </label>
    <select [name]="nameLabel">
      <option *ngFor="let option of options" [value]="option">{{option}}</option>
    </select>
  `,
  styles: [
  ]
})
export class SelectInFormComponent {
  @Input() nameLabel!: string;
  @Input() options!: string[];
}
