import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  username = new FormControl('', [Validators.minLength(3), Validators.maxLength(50), Validators.required]);
  password = new FormControl('', [Validators.minLength(3), Validators.maxLength(255), Validators.required]);

  constructor(
    private title: Title,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Login");
  }

  logar() {
    this.service.logout();
    if (this.username.valid && this.password.valid) {
      const loginInfo: Login = {
        username: this.username.value!,
        password: this.password.value!,
      };

      this.service.authenticate(loginInfo).subscribe(res => {
        let token = JSON.parse(res.body).token;
        this.service.successFullLogin(token);
        this.router.navigate(['']);
      }, err => {
        if (err.status === 403) {
          this.toastr.error('Login incorreto');
          this.service.logout();
        } else if (err.error.errors) {
          err.error.errors.forEach(element => {
            this.toastr.error(element.message);
          })
        }
        else {
          this.toastr.error(err.error);
        }


      });
    }
  }

  registrar() {
    if (this.username.valid && this.password.valid) {
      const loginInfo: Login = {
        username: this.username.value!,
        password: this.password.value!,
      };

      this.service.register(loginInfo).subscribe(res => {
        this.toastr.success('Registro realizado com sucesso');
        this.router.navigate(['login']); // Redireciona para a tela de login após registro
      }, err => {
        if (err.status === 400) {
          this.toastr.error('Registro inválido');
        } else if (err.error.errors) {
          err.error.errors.forEach(element => {
            this.toastr.error(element.message);
          })
        } else {
          this.toastr.error(err.error);
        }
      });
    }
  }


  validaCampos(): boolean {
    return this.username.valid && this.password.valid;
  }
}
