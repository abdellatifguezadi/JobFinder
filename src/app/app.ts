import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OffersList } from "./features/offres/pages/offers-list/offers-list";
import { Header } from "./shared/components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OffersList, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('JobFinder1');
}
