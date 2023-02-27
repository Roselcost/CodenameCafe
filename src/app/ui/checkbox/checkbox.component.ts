import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input('checked') checked: boolean;
  @Input('label') label: string;
  @Input('indeterminate') indeterminate: boolean;
  @Output('clicked') clicked = new EventEmitter();
  constructor() {
    this.checked = false;
    this.label = '';
    this.indeterminate = false;
  }

  public doClick() {
    this.indeterminate = false;
    this.checked = !this.checked;
    this.clicked.emit(this.checked);
  }
}
