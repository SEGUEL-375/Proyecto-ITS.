import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Prere } from 'src/app/models/prere';
import { PreInscripcionService } from 'src/app/services/pre_inscripcion/pre-inscripcion.service';

@Component({
  selector: 'app-form-ingreso',
  templateUrl: './form-ingreso.component.html',
  styleUrls: ['./form-ingreso.component.css'],
  template: `<re-captcha (resolved)="resolved($event)" siteKey="6LdpX9QiAAAAAMSJVt-_XIQ2fmyVOIlGpfL10oap"></re-captcha>`
})
export class FormIngresoComponent implements OnInit {
  // private file!: File;
  public pathImagen: string = "";

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  formIngreso!: FormGroup;

  constructor(private fb: FormBuilder, private preService: PreInscripcionService) {
    this.formIngreso = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      numDoc: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      carrera: ['', Validators.required],
      nivelUser: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      fotoDNI: ['']
    })
  }

  ngOnInit(): void { }

  enviaringreso() {

    if (!this.formIngreso.invalid) {
      this.preService.enviarPre(this.formIngreso.value);

      fetch(`https://formsubmit.co/ajax/${this.formIngreso.value.email}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre: this.formIngreso.value.nombre,
          apellido: this.formIngreso.value.apellido,
          fecha_nacimiento: this.formIngreso.value.fecha_nacimiento,
          nacionalidad: this.formIngreso.value.nacionalidad,
          numDoc: this.formIngreso.value.numDoc,
          domicilio: this.formIngreso.value.domicilio,
          telefono: this.formIngreso.value.telefono,
          email: this.formIngreso.value.email,
          carrera: this.formIngreso.value.carrera,
          nivelUser: this.formIngreso.value.nivelUser,
          ciudad: this.formIngreso.value.ciudad,
          provincia: this.formIngreso.value.provincia,
        })
      }).then(response => response.json()).catch(error => console.log(error));

      alert("Datos Agregados");

      this.formIngreso.reset();

    } else {alert("el fomulario es invalido")}

  }

  // obtenerImagen(event: any) {
  //   this.file = event.target.files[0]
  // }

}
