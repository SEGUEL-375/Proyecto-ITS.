import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  formLogin!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router) { 
    this.formLogin = this.fb.group({
      email_user: ['', Validators.email],
      password_user: ['', Validators.minLength(8)]
    });
  }

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.authService.login(email, password).then((credenciales) => {
      if(!credenciales) {
        alert('datos incorrectos');
        return false;
      }
      
      return this.router.navigate(['/']);
    });
  }

  recuperarContra(email: string) {
    if (!email) {
      alert('Por favor complete el campo de email');
    } else {
      this.authService.forgotPassword(email).then(() => alert('Correo de restauración enviado')).catch(err => console.log(err));
    }
  }
}
