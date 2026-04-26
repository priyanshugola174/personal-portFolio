import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm: FormGroup;
  submitted = false;
  showSuccess = false;
  isSending = false;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      this.isSending = true;
      const formData = this.contactForm.value;

      this.http.post(environment.formspreeUrl, formData).subscribe({
        next: (response) => {
          this.showSuccess = true;
          this.contactForm.reset();
          this.submitted = false;
          this.isSending = false;
          setTimeout(() => this.showSuccess = false, 5000);
        },
        error: (err) => {
          console.error('Submission failed, using mailto fallback', err);
          this.isSending = false;
          this.useMailtoFallback(formData);
        }
      });
    }
  }

  private useMailtoFallback(data: any) {
    const subject = `Portfolio Inquiry from ${data.name}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
    const mailtoUrl = `mailto:${environment.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    // Still show success message locally
    this.showSuccess = true;
    this.contactForm.reset();
    setTimeout(() => this.showSuccess = false, 5000);
  }
}
