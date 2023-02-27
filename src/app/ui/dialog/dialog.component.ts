import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const inOutAnimation = animation([
  style({ opacity: '0', transform: 'translateY(-20px)' }),
  animate('0.2s ease', style({ opacity: '1', transform: 'translateY(0px)' })),
]);

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [useAnimation(inOutAnimation)]),
    ]),
  ],
})
export class DialogComponent implements OnInit, OnDestroy {
  @Output() closeWindow = new EventEmitter();
  constructor() {}

  public ngOnInit() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  public ngOnDestroy() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  public closeWindowEvent() {
    this.closeWindow.emit();
  }
}
