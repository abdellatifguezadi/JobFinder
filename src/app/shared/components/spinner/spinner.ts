import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
  standalone: true
})
export class Spinner {
  message = input<string>('Loading...');
}
