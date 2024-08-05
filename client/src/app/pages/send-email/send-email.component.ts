import { Component } from '@angular/core';
import { MessagesService } from '../dashboard/messages/messages.service';
import { Router } from '@angular/router';
import { ClientsService } from '../dashboard/clients/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendEmailService } from './send-email.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent {
  generalInfoForm: FormGroup;
  model = false;
  messageId = NaN;

  success = { status: false, message: '' };

  constructor(
    private messagesService: MessagesService,
    private clientsService: ClientsService,
    private sendEmailService: SendEmailService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.generalInfoForm = this.fb.group({
      listOfClients: [[''], Validators.required],
    });
  }
  message = '';
  clients = [{ email: '' }];
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
    this.clientsService.getAllEmail().subscribe((res) => {
      console.log(res.data);
      this.clients = res.data;
    });
  }
  onSubmit() {
    console.log(this.generalInfoForm.value);

    if (this.generalInfoForm.valid) {
      this.sendEmailService
        .sendMessage(this.generalInfoForm.value, this.messageId)
        .subscribe((res) => {
          this.success = { status: true, message: res.message };
          setInterval(() => {
            this.success = { status: false, message: '' };
          }, 2500);
          this.model = false;
          this.generalInfoForm.reset();
        });
    }
  }
  openModel(messageId: number) {
    console.log(messageId);

    this.messageId = messageId;
    this.model = true;
  }
  closeModel() {
    this.model = false;
  }
}
