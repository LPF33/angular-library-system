import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLoopTimes]'
})
export class LoopTimesDirective {

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  @Input("appLoopTimes") set length(num: number) {
    this.viewContainer.clear();
    for (let i = 0; i < num; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        index: i,
        color: `rgb(${this.getRandomRGBValue()},${this.getRandomRGBValue()},${this.getRandomRGBValue()})`,
      })
    }
  }

  getRandomRGBValue() {
    return Math.floor(Math.random() * 256);
  }
}
