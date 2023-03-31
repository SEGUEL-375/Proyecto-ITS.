import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {

  formRegister!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router) { 
    this.formRegister = this.fb.group({
      nombre_user: ['', Validators.required],
      apellido_user: ['', Validators.required],
      email_user: ['', Validators.email],
      password_user: ['', Validators.minLength(8)],
    });
  }

  ngOnInit(): void {}

  registrarse(user: UserInterface) {
    this.authService.register(user).then(() => {
      alert("Usuario registrado correctamente, por favor revise su buzon de entrada para validar su correo");
      this.router.navigate(['/login']);
    });
  }

}
