import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title-text',
  imports: [],
  templateUrl: './title-text.html',
  styleUrl: './title-text.css',
})
export class TitleText {
   title = input.required<string>();
   titleDescription = input.required<string>();
}
