import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <label [for]="id" class="block text-sm font-semibold text-black mb-2">
        <span class="flex items-center gap-1">
          @if (icon) {
            <span class="material-icons text-base">{{ icon }}</span>
          }
          {{ label }}
        </span>
      </label>
      <input 
        [type]="type"
        [id]="id"
        [formControl]="control"
        [placeholder]="placeholder"
        class="w-full border-2 border-black px-4 py-3 focus:outline-none focus:shadow-[4px_4px_0_black] transition-shadow"
      />
      @if (control.invalid && control.touched) {
        <p class="text-red-600 text-xs mt-1 font-semibold">{{ errorMessage }}</p>
      }
    </div>
  `,
  styles: []
})
export class FormInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() icon?: string;
  @Input() control!: FormControl;
  @Input() errorMessage: string = 'This field is required';
}
