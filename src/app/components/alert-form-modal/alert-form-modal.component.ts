import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../models/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './alert-form-modal.component.html',
  styleUrl: './alert-form-modal.component.css'
})
export class AlertFormModalComponent {
  alertForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.alertForm = this.fb.group({
      level: ['NORMAL', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.alertForm.valid) {
      const newAlert: Alert = this.alertForm.value;

      this.alertService.create(newAlert).subscribe(() => {
        this.activeModal.close(true);
      });
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
