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

  toggleMenu() {
    this.open = !this.open;
  }

  linkAction() {
    console.log('url pressed');
    //this.router.navigate(['/url'])
  }
}
