import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-button.html',
  styles: []
})
export class FormButtonComponent {
  @Input() text: string = 'Submit';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() icon?: string;
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() loadingText: string = 'Loading...';
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (this.type === 'button') {
      this.clicked.emit();
    }
  }
}
