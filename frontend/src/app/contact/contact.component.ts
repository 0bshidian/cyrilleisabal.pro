import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
	name: string | any; 
	email: string | any; 
	message: string | any; 

	constructor(private emailService: EmailService) {}

	onSubmit() {
		this.emailService.sendEmail(this.name, this.email, this.message).subscribe(
			response => {
			console.log('Email send sucessfully!');
			}, 
			error => {
				console.log('Error sending email: ', error);
			}
		);
	}
}
