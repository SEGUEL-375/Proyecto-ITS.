import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarreraInterface } from 'src/app/models/plan-estudio';
import { PlanEstudioService } from 'src/app/services/plan_estudio/plan-estudio.service';

@Component({
  selector: 'app-modal-form-plan',
  templateUrl: './modal-form-plan.component.html',
  styleUrls: ['./modal-form-plan.component.css']
})
export class ModalFormPlanComponent implements OnInit {

  formCarrera!: UntypedFormGroup;
  carreras: CarreraInterface[] = [];
  carrera: string = "";

  idCarrera!: string;

  constructor(private fb: UntypedFormBuilder, private planService: PlanEstudioService, private route: ActivatedRoute) {
    this.formCarrera = this.fb.group({
      nombre_carrera: [''],
      cant_anios: [''],
      cant_horas: [''],
      cant_materias: [''],
      resolucion: [''],
    });

    this.route.queryParams.subscribe(_params => {
      this.carrera = _params['carrera'];
    });
  }

  ngOnInit(): void {
    this.getcarreras(Number(this.carrera) - 1);
  }

  getcarreras(index: number) {
    this.planService.getCarreras().subscribe(data => {
      this.carreras = data;
      this.idCarrera = this.carreras[index].id
      console.log(this.carreras[index].id);
    })
  }

  actualizarDatos(datos: CarreraInterface) {

    if (this.formCarrera.value.nombre_carrera == '') {
      this.formCarrera.value.nombre_carrera = this.carreras[0].nombre_carrera;
    }

    if (this.formCarrera.value.cant_anios == '') {
      this.formCarrera.value.cant_anios = this.carreras[0].cant_anios;
    }

    if (this.formCarrera.value.cant_horas == '') {
      this.formCarrera.value.cant_horas = this.carreras[0].cant_horas;
    }

    if (this.formCarrera.value.cant_materias == '') {
      this.formCarrera.value.cant_materias = this.carreras[0].cant_materias;
    }

    if (this.formCarrera.value.resolucion == '') {
      this.formCarrera.value.resolucion = this.carreras[0].resolucion;
    }

    this.planService.updateCarrera(this.idCarrera, datos);
  }

}
