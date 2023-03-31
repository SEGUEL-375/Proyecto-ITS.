import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarreraInterface } from 'src/app/models/plan-estudio';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlanEstudioService } from 'src/app/services/plan_estudio/plan-estudio.service';

@Component({
  selector: 'app-planes-estudio',
  templateUrl: './planes-estudio.component.html',
  styleUrls: ['./planes-estudio.component.css']
})
export class PlanesEstudioComponent implements OnInit {

  carrera: any;
  carreras: CarreraInterface[] = [];
  login!: boolean;
  userRol!: string;

  constructor(private route: ActivatedRoute, private planService: PlanEstudioService, private authService: AuthService) { 
    this.route.queryParams.subscribe(_params => {
      this.carrera = _params['carrera'];
    });
  }

  ngOnInit(): void {

    this.planService.getCarreras().subscribe((datos) => {
      this.carreras = datos;
    })

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
}
