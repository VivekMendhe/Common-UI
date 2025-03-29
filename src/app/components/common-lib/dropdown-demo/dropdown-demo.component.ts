import { Component } from '@angular/core';
import { DropdownComponent } from "../../../libs/common-lib/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-demo',
  imports: [DropdownComponent, CommonModule, FormsModule],
  templateUrl: './dropdown-demo.component.html',
  styleUrl: './dropdown-demo.component.scss'
})
export class DropdownDemoComponent {
  selectedValues: any[] | any = []; // Store selected values
  multiSelect = false;

  constructor() {}


  onSelectionChange(event: any): void {
    if (Array.isArray(event)) {
      // Multi-select mode
      this.selectedValues = event;
    } else {
      // Single-select mode: Wrap the single value in an array
      this.selectedValues = [event];
    }
    console.log('Selected values:', this.selectedValues);
  }
}
