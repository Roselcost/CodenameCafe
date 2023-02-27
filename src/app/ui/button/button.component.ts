import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() selected: boolean = false;
  @Input() type: string = '';
  @Input() width: string = '';
  @Input() height: string = '';
  @Input() padding: string = '';
  @Input() fontSize: string = '';
}
