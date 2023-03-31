import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlanEstudioInterface } from 'src/app/models/plan-estudio';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlanEstudioService } from 'src/app/services/plan_estudio/plan-estudio.service';

@Component({
  selector: 'app-tabla-planes',
  templateUrl: './tabla-planes.component.html',
  styleUrls: ['./tabla-planes.component.css']
})
export class TablaPlanesComponent implements OnInit {
  carrera: string = "";

  planEstudio!: PlanEstudioInterface;

  ids: any;

  edit: boolean = false;

  formEdit!: UntypedFormGroup;

  login!: boolean;
  userRol: any;

  constructor(private planService: PlanEstudioService, private route: ActivatedRoute, private fb: UntypedFormBuilder, private authService: AuthService) {
    this.route.queryParams.subscribe(_params => {
      this.carrera = _params['carrera'];
    });

    this.formEdit = this.fb.group({
      nombre_materia: [''],
      detalle: [''],
      ubicacion: [''],
      ubicacion_anual: ['']
    })
  }

  ngOnInit(): void {
    this.getCarreras()
  }

  getCarreras() {
    this.planService.getCarreras().subscribe(id => {
      this.ids = id[Number(this.carrera) - 1].id;
      this.planEstudio = id[Number(this.carrera) - 1].plan_estudio!;
    });

    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.login = true;

        const uid = user.uid;
        this.authService.isUserAdmin(uid).subscribe(rol => {
          this.userRol = rol?.rol!;
        })

      } else {
        this.login = false
        this.userRol = ''
      }
    });
  }

  editPlanEstudio(editData: any) {

    if (this.edit == false) {
      this.edit = true;

    } else {

      if (this.formEdit.value.nombre_materia != '') {
        editData.nombre_materia = this.formEdit.value.nombre_materia
      }

      if (this.formEdit.value.detalle != '') {
        editData.detalle = this.formEdit.value.detalle
      }

      if (this.formEdit.value.ubicacion != '') {
        editData.ubicacion = this.formEdit.value.ubicacion
      }

      if (this.formEdit.value.ubicacion_anual != '') {
        editData.ubicacion_anual = this.formEdit.value.ubicacion_anual
      }

      this.planService.updateMateria(this.ids, editData).then(() => {
        console.log(editData);
        this.edit = false;
        this.formEdit.reset({
          nombre_materia: [''],
          detalle: [''],
          ubicacion: [''],
          ubicacion_anual: ['']
        })
      });
    }
  }

  nuevaMateria() {
    this.planService.postMateria(this.ids, this.formEdit.value);
    this.planEstudio.materias.push(this.formEdit.value);
  }

  eliminarMateria(editData: any) {
    this.planService.deleteMateria(this.ids, editData)
  }
}
