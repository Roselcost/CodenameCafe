import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[defaultimage]',
})
export class DefaultimageDirective {
  constructor() {}
  @HostBinding('src') @Input() src: string = '';
  @Input() default: string = '';
  @HostListener('error', ['$event']) onError() {
    this.src = this.default;
  }
}
