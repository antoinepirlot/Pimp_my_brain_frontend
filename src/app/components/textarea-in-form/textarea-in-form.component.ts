import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-in-form',
  templateUrl: './textarea-in-form.component.html',
  styleUrls: ['./textarea-in-form.component.css'
  ]
})
export class TextareaInFormComponent {
  @Input() inputControl!: FormControl;
  @Input() nameLabel!: string;
  @Input() nameMarkup!: string;
  @Input() rows?: string
  @Input() cols?: string
  @Input() placeholder?: string
}
