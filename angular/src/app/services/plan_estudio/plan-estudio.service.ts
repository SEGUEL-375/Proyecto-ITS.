import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CarreraInterface, PlanEstudioInterface } from 'src/app/models/plan-estudio';

@Injectable({
  providedIn: 'root'
})
export class PlanEstudioService {

  private carreraCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.carreraCollection = db.collection<CarreraInterface>('carreras');
  }

  //SE AGREGA LA CARRERA A FIRESTORE CON ID GENERADO
  async agregarCarrera(carrera: CarreraInterface) {
    try {
      const idCarrera = this.db.createId();
      carrera.id = idCarrera;

      return await this.carreraCollection.doc(idCarrera).set(carrera);

    } catch (error) {
      console.log('No se pudo agregar la carrera');
    }
  }

  //TRAE TODOS LOS DATOS DE LA CARRERA
  getCarreras() {
    return this.carreraCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as CarreraInterface))
    );
  }

  //TRAE TODOS LOS DATOS DE LAS MATERIAS DE LA CARRERA
  getMaterias() {
    return this.carreraCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data().plan_estudio as PlanEstudioInterface))
    );
  }

  // MODIFICAR DATOS EN LA CARRERA SELECCIONADA (MODAL LAPIZ EN MODAL-FORM-PLAN.COMPONENT)
  updateCarrera(idCarrera: string, carrera: CarreraInterface) {
    return this.carreraCollection.doc(idCarrera).update(carrera);
  }

  updateMateria(idCarrera: string, datosMateria: any) {
    return this.carreraCollection.doc(idCarrera).update({
      ['plan_estudio.materias'] : arrayUnion(datosMateria)
    });
  }

  postMateria(idCarrera: string, nuevaMateria: any) {
    return this.carreraCollection.doc(idCarrera).update({
      ['plan_estudio.materias'] : arrayUnion(nuevaMateria)
    });
  }

  deleteMateria(idCarrera: string, materia: any) {
    return this.carreraCollection.doc(idCarrera).update({
      ['plan_estudio.materias'] : arrayRemove(materia)
    });
  }
}
