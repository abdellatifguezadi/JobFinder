import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type"
      [disabled]="disabled || isLoading"
      (click)="handleClick()"
      class="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black uppercase tracking-wider font-semibold py-3 px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      @if (isLoading) {
        <span class="material-icons text-base animate-spin">refresh</span>
        {{ loadingText }}
      } @else {
        @if (icon) {
          <span class="material-icons text-base">{{ icon }}</span>
        }
        {{ text }}
      }
    </button>
  `,
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
