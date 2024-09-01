import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceService } from '../../services/device.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Device } from '../../models/device';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './device-form-modal.component.html',
  styleUrls: ['./device-form-modal.component.css']
})
export class DeviceFormModalComponent {
  deviceForm!: FormGroup;
  @Input() deviceId?: string; // Use @Input para receber o deviceId
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.deviceId;

    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      status: ['ATIVO', Validators.required],
      location: ['']
    });

    if (this.isEdit && this.deviceId) {
      this.deviceService.findById(this.deviceId).subscribe(device => {
        this.deviceForm.patchValue(device);
      });
    }
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      const device: Device = this.deviceForm.value;

      if (this.isEdit) {
        this.deviceService.update(this.deviceId!, device).subscribe(() => {
          this.activeModal.close(true);
        });
      } else {
        this.deviceService.create(device).subscribe(() => {
          this.activeModal.close(true);
        });
      }
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
