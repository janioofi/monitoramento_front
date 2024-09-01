import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertFormModalComponent } from '../alert-form-modal/alert-form-modal.component';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {
  alerts: Alert[] = [];

  constructor(
    private alertService: AlertService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  // Carregar alertas
  private loadAlerts(): void {
    this.alertService.findAll().subscribe(
      (data: Alert[]) => {
        this.alerts = data;
      },
      (error) => {
        this.toastr.error('Erro ao carregar alertas.');
      }
    );
  }


  // Excluir alerta
  deleteAlert(idAlert: string): void {
    if (confirm('Tem certeza que deseja excluir este alerta?')) {
      this.alertService.delete(idAlert).subscribe(
        () => {
          this.alerts = this.alerts.filter(alert => alert.id !== idAlert);
          this.toastr.success('Alerta excluído com sucesso.');
        },
        () => {
          this.toastr.error('Erro ao excluir alerta.');
        }
      );
    }
  }

  addAlert(): void {
    const modalRef = this.modalService.open(AlertFormModalComponent);
    modalRef.result.then(result => {
      if (result) {
        this.loadAlerts(); // Recarregar a lista de alertas após adicionar
      }
    }).catch(() => {});
  }
}
