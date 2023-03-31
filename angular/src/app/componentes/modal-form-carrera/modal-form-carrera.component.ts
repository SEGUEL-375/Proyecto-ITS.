import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CarreraInterface } from 'src/app/models/plan-estudio';
import { PlanEstudioService } from 'src/app/services/plan_estudio/plan-estudio.service';

@Component({
  selector: 'app-modal-form-carrera',
  templateUrl: './modal-form-carrera.component.html',
  styleUrls: ['./modal-form-carrera.component.css']
})
export class ModalFormCarreraComponent implements OnInit {

  formCarrera!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private planService: PlanEstudioService) {
    this.formCarrera = this.fb.group({
      nombre_carrera: ['', Validators.required],
      cant_anios: ['', Validators.required],
      cant_horas: ['', Validators.required],
      cant_materias: ['', Validators.required],
      resolucion: ['', Validators.required],
      plan_estudio: [{
        materias: [{
          nombre_materia: '',
          detalle: '',
          ubicacion: '',
          ubicacion_anual: ''
        }]
      }]
    })
  }

  ngOnInit(): void { }

  guardarCarrera(datos: CarreraInterface) {
    this.planService.agregarCarrera(datos).then(() => {
      alert('Se agrego la carrera');
      this.formCarrera.reset();
    }).catch(err => console.log(err));
  }

}
