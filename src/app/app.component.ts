import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownDemoComponent } from "./components/common-lib/dropdown-demo/dropdown-demo.component";
import { TooltipDemoComponent } from "./components/common-lib/tooltip-demo/tooltip-demo.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DropdownDemoComponent, TooltipDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'common_ui';
}
