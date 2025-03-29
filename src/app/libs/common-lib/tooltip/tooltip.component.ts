import { CommonModule } from '@angular/common';
import { Component, Input, HostListener, ElementRef  } from '@angular/core';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() tooltipText: string = '';
  @Input() position: TooltipPosition = 'bottom';
  isVisible: boolean = false;
  tooltipStyle: { [key: string]: string } = {};
  tooltipClass: string = 'tooltip-bottom';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.isVisible = true;
    this.updatePosition();
    this.updateTooltipClass();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isVisible = false;
  }

  private updatePosition() {
    const hostElement = this.el.nativeElement;
    const tooltipOffset = 8; // Distance from host element
    const arrowSize = 5; // Size of the tooltip arrow

    const hostRect = hostElement.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    switch (this.position) {
      case 'top':
        this.tooltipStyle = {
          top: `${hostRect.top + scrollY - tooltipOffset}px`,
          left: `${hostRect.left + scrollX + hostRect.width / 2}px`,
          transform: 'translateX(-50%) translateY(-100%)'
        };
        break;
      case 'bottom':
        this.tooltipStyle = {
          top: `${hostRect.bottom + scrollY + tooltipOffset}px`,
          left: `${hostRect.left + scrollX + hostRect.width / 2}px`,
          transform: 'translateX(-50%)'
        };
        break;
      case 'left':
        this.tooltipStyle = {
          top: `${hostRect.top + scrollY + hostRect.height / 2}px`,
          left: `${hostRect.left + scrollX - tooltipOffset}px`,
          transform: 'translateX(-100%) translateY(-50%)'
        };
        break;
      case 'right':
        this.tooltipStyle = {
          top: `${hostRect.top + scrollY + hostRect.height / 2}px`,
          left: `${hostRect.right + scrollX + tooltipOffset}px`,
          transform: 'translateY(-50%)'
        };
        break;
    }
  }

  private updateTooltipClass() {
    this.tooltipClass = `tooltip-${this.position}`;
  }

}
