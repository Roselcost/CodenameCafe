import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent {
  @Input() src: string = '';
  @Input() height: string = '';
  @Input() width: string = '';
}
