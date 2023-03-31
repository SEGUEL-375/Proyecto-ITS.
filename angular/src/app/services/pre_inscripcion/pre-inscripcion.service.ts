import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Prere } from '../../models/prere';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreInscripcionService {
  // private urlImagen: string = '';
  private preColletion!: AngularFirestoreCollection<Prere>;

  constructor(private bd: AngularFirestore, private storage: AngularFireStorage) {
    this.preColletion = this.bd.collection<Prere>('usuario_pre');
  }

  enviarPre(formulario: Prere) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.bd.createId();
        formulario.id = id;

        const result = await this.preColletion.doc(id).set(formulario);
        resolve(result);

      } catch (error) {reject(error);}
    });
  }

  getAlumnos() {
    return this.preColletion.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as Prere))
    );
  }

  // subirImagen(file: File, preUsuario: Prere) {
  //  const imagenPath = 'imagenes/preUsuario/${file.name}';
  // const imagenRef = this.storage.ref(imagenPath);

  //----//esta "tarea" sube la imagen,(direccion, lo que subo)
  //const tarea = this.storage.upload(imagenPath, file)

  //tarea.snapshotChanges().pipe(finalize(()=>{
  //  imagenRef.getDownloadURL().subscribe((url)=>{
  //  this.urlImagen=url
  // preUsuario.fotoDNI=this.urlImagen
  // this.enviarPre(preUsuario)
  //})
  //})).subscribe()
  //}
}
