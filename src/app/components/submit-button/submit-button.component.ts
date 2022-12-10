import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: []
})
export class SubmitButtonComponent {
  @Input() value!: string;
}
