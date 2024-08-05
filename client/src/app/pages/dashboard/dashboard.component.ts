import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) {}
  open: boolean = false;
  title = 'DashBoard';
  private tokenKey = 'authToken';
  private userEmail = 'user';

  toggleMenu() {
    this.open = !this.open;
  }

  linkAction(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userEmail);
    this.router.navigate(['/']);
  }
}
