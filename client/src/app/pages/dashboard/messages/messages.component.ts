import { Component } from '@angular/core';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  constructor(
    private messagesService: MessagesService,
    private router: Router
  ) {}
  message = '';
  data = [
    {
      id: NaN,
      object: '',
      description: '',
      importance_status: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  ngOnInit() {
    this.messagesService.getAll().subscribe((res) => {
      console.log(res);
      this.message = res.message;
      this.data = res.data;
    });
  }

  edit(id: number) {
    this.router.navigate(['/dashboard/messages/' + id]);
  }
  delete(id: number) {
    this.messagesService.delete(id).subscribe((res) => {
      this.messagesService.getAll().subscribe((res) => {
        this.message = res.message;
        this.data = res.data;
      });
    });
  }
  create() {
    this.router.navigate(['/dashboard/messages/create']);
  }
}
