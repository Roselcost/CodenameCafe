import { Component, Input } from '@angular/core';
import { Allergen } from '@interfaces/allergen.interface';

@Component({
  selector: 'app-allergen',
  templateUrl: './allergen.component.html',
  styleUrls: ['./allergen.component.scss'],
})
export class AllergenComponent {
  @Input() allergen: Allergen;

  constructor() {
    this.allergen = { name: '', color: '', icon: '' };
  }
}
