import { Component } from '@angular/core';
import { ClientsService } from './clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  constructor(private clientsService: ClientsService, private router: Router) {}
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
    this.clientsService.getAll().subscribe((res) => {
      console.log(res);
      this.message = res.message;
      this.data = res.data;
    });
  }

  edit(id: number) {
    this.router.navigate(['/dashboard/clients/' + id]);
  }
  delete(id: number) {
    this.clientsService.delete(id).subscribe((res) => {
      this.clientsService.getAll().subscribe((res) => {
        this.message = res.message;
        this.data = res.data;
      });
    });
  }
  create() {
    this.router.navigate(['/dashboard/clients/create']);
  }
}
