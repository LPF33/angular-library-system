import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  htmlElement: string;

  constructor(private elementRef: ElementRef) {
    this.htmlElement = elementRef.nativeElement.tagName;
  }

  @Input('class') className?: string;

  @HostListener("mouseover", ['$event']) onMouseover(event: MouseEvent) {
    if(this.className && this.htmlElement === "svg") {
      const rect = this.elementRef.nativeElement.querySelector('.'+this.className);
      rect.style.stroke = "yellow";
    }
  }

  @HostListener("mouseleave") onMouseleave() {
    if(this.className && this.htmlElement === "svg") {
      const rect = this.elementRef.nativeElement.querySelector('.'+this.className);
      rect.style.stroke = "white";
    }
  }
}
