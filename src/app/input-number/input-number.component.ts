import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent {
  @Input() inputControl!: FormControl;
  @Input() nameLabel!: string;
  @Input() nameMarkup!: string;
  @Input() unitOFMeasure?: string
  @Input() min?: string
  @Input() max?: string
  @Input() step?: string
  @Input() placeholder?: string
}
