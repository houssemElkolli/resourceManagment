import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private usersService: UsersService, private router: Router) {}
  message = '';
  data = [
    {
      id: NaN,
      firstname: '',
      lastname: '',
      email: '',
      date_of_birth: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  ngOnInit() {
    this.usersService.getAll().subscribe((res) => {
      console.log(res);
      this.message = res.message;
      this.data = res.data;
    });
  }

  edit(id: number) {
    this.router.navigate(['/dashboard/users/' + id]);
  }
  delete(id: number) {
    this.usersService.delete(id).subscribe((res) => {
      this.usersService.getAll().subscribe((res) => {
        this.message = res.message;
        this.data = res.data;
      });
    });
  }
  create() {
    this.router.navigate(['/dashboard/users/create']);
  }
}
