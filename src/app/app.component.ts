import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Healthy-Desk';

  isAccountMenuVisible: boolean = false;
  router: any;
  
  isNavigationVisible: boolean = false;

  toggleAccountVisibility() {
    this.isAccountMenuVisible = !this.isAccountMenuVisible;
  }

  checkIfNavigationVisible() {
    this.isNavigationVisible = this.router.url !== '/login';
  }
}
