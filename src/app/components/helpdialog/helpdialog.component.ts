import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StringService } from '@services/string.service';
import { setCurrentOpenDialog } from '@store/app.actions';
import { allergenList } from '@interfaces/allergen.interface';
import type { Allergen } from '@interfaces/allergen.interface';
import type { AppState } from '@interfaces/appState.interface';

@Component({
  selector: 'app-helpdialog',
  templateUrl: './helpdialog.component.html',
  styleUrls: ['./helpdialog.component.scss'],
})
export class HelpdialogComponent {
  strings;
  allergens: (Allergen & { label: string })[];
  constructor(
    private store: Store<{ state: AppState }>,
    private stringService: StringService
  ) {
    this.allergens = allergenList.map((allergen) => {
      return { ...allergen, label: '' };
    });
    this.strings = this.stringService.strings;
    this.strings.subscribe((strings) => {
      this.allergens = this.allergens.map((allergen: Allergen) => {
        return { ...allergen, label: strings[allergen.name] };
      });
    });
  }

  public closeDialog() {
    this.store.dispatch(setCurrentOpenDialog({ dialog: '' }));
  }
}
