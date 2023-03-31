import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder,Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PreInscripcionService } from 'src/app/services/pre_inscripcion/pre-inscripcion.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  formModal!: UntypedFormGroup;
  constructor(private builder: UntypedFormBuilder, private datosService: ModalService)  { 

    this.formModal = this.builder.group({
      nombre: ['', Validators.required],
      cue: ['', Validators.required],
      provincia: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      logo: [''],
      tele: ['', Validators.required],
      tele2: [''],
      tele3: [''],
      email:['', Validators.required],
      email2:[''],
      email3:[''],
    })
  }

  ngOnInit(): void {}

  enviarDatos() {
    if (!this.formModal.invalid) {
      console.log(this.formModal.value);
      this.datosService.enviarModal(this.formModal.value);
      alert("Datos Agregados");
      this.formModal.reset();
    }
    else {
      alert("el fomulario es invalido");
      console.log(this.formModal.value);
    }
  }

}
