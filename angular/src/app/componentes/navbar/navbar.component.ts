import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login!: boolean;
  userRol: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
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

  logOut() {
    this.authService.logOut()
  }

}
