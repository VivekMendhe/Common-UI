import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

export interface DropdownMenu {
  name: string;
  value: any;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() items: DropdownMenu[] = [];
  @Input() multiSelect = false;
  @Input() placeholder = 'Select an option';
  @Output() selectionChange = new EventEmitter<any>();

  isOpen = false;
  selectedItems: any[] = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: DropdownMenu) {
    if (this.multiSelect) {
      const index = this.selectedItems.indexOf(item.value);
      if (index === -1) {
        this.selectedItems.push(item.value);
      } else {
        this.selectedItems.splice(index, 1);
      }
    } else {
      this.selectedItems = [item.value];
      this.isOpen = false; // Close dropdown after selecting an item in single-select mode
    }
    this.selectionChange.emit(this.multiSelect ? this.selectedItems : this.selectedItems[0]);
  }

  isSelected(item: DropdownMenu): boolean {
    return this.selectedItems.includes(item.value);
  }

  get displayText(): string {
    if (this.selectedItems.length === 0) return this.placeholder;
    if (!this.multiSelect) return this.items.find(i => i.value === this.selectedItems[0])?.name || '';
    return `${this.selectedItems.length} selected`;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    // Check if the click was outside the dropdown
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false; // Close the dropdown
    }
  }
}
