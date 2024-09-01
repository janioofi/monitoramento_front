import { Component } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Log } from '../../models/log';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-logs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './device-logs.component.html',
  styleUrl: './device-logs.component.css'
})
export class DeviceLogsComponent {
  logs: Log[] = [];
  deviceId: string = '';

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id')!;
    this.loadLogs();
  }

  loadLogs(): void {
    this.deviceService.getDeviceLogs(this.deviceId).subscribe(
      data => this.logs = data,
      error => this.toastr.error('Erro ao carregar logs.')
    );
  }
}
