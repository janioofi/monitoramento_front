import { Component } from '@angular/core';
import { Device } from '../../models/device';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceFormModalComponent } from '../device-form-modal/device-form-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  devices: Device[] = [];

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  openDeviceForm(deviceId?: string): void {
    const modalRef = this.modalService.open(DeviceFormModalComponent);
    modalRef.componentInstance.deviceId = deviceId; // Passando deviceId para o modal

    modalRef.result.then(result => {
      if (result) {
        this.loadDevices(); // Recarregar a lista de dispositivos após criar/editar
      }
    }).catch(() => {});
  }

  addDevice(): void {
    this.openDeviceForm();
  }

  editDevice(deviceId: string): void {
    this.openDeviceForm(deviceId);
  }

  private loadDevices(): void {
    this.deviceService.findAll().subscribe(
      (data: Device[]) => {
        this.devices = data;
      },
      (error) => {
        this.toastr.error('Erro ao carregar dispositivos.');
      }
    );
  }

  deleteDevice(deviceId: string): void {
    if (confirm('Tem certeza que deseja excluir este dispositivo?')) {
      this.deviceService.delete(deviceId).subscribe(
        () => {
          this.devices = this.devices.filter(device => device.idDevice !== deviceId);
          this.toastr.success('Dispositivo excluído com sucesso.');
        },
        () => {
          this.toastr.error('Erro ao excluir dispositivo.');
        }
      );
    }
  }

  viewLogs(deviceId: string): void {
    this.router.navigate(['/device-logs', deviceId]);
  }
}
