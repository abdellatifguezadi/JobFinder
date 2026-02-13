import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.html',
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
