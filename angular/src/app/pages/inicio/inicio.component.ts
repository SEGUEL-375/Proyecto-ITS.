import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  login!: boolean;
  userRol!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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
