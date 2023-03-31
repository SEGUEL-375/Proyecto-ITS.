import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormIngresoComponent } from './componentes/form-ingreso/form-ingreso.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BarraSuperiorComponent } from './componentes/barra-superior/barra-superior.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { LoginComponent } from './pages/login/login.component';
import { FormLoginComponent } from './componentes/form-login/form-login.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormRegistroComponent } from './componentes/form-registro/form-registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { TopBarComponent } from './componentes/top-bar/top-bar.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { TablaPlanesComponent } from './componentes/tabla-planes/tabla-planes.component';
import { PlanesEstudioComponent } from './pages/planes-estudio/planes-estudio.component';
import { ModalFormPlanComponent } from './componentes/modal-form-plan/modal-form-plan.component';
import { ModalFormCarreraComponent } from './componentes/modal-form-carrera/modal-form-carrera.component';
import { RecaptchaModule } from "ng-recaptcha";

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { PdfmakeComponent } from './componentes/pdfmake/pdfmake.component';


@NgModule({
  declarations: [
    AppComponent,
    FormIngresoComponent,
    InicioComponent,
    BarraSuperiorComponent,
    IngresoComponent,
    LoginComponent,
    FormLoginComponent,
    FooterComponent,
    RegistroComponent,
    FormRegistroComponent,
    NavbarComponent,
    TopBarComponent,
    ModalComponent,
    TablaPlanesComponent,
    PlanesEstudioComponent,
    ModalFormPlanComponent,
    ModalFormCarreraComponent,
    PdfmakeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: PERSISTENCE, useValue: 'session' },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
