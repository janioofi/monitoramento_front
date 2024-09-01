import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NavComponent } from './components/nav/nav.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'device-logs/:id', loadComponent: () => import('./components/device-logs/device-logs.component').then(m => m.DeviceLogsComponent) },
      { path: 'alertas', loadComponent: () => import('./components/alerta/alerta.component').then(m => m.AlertaComponent) },
      // Adicione outras rotas aqui
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redireciona a rota padrão para /dashboard
      { path: '**', redirectTo: '/dashboard' } // Redireciona qualquer rota inválida para /dashboard
    ],
  },
];
