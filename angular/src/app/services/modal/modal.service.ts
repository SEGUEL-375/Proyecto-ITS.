import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Modal } from '../../models/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalColletion!: AngularFirestoreCollection<Modal>;
  
  constructor(private bd: AngularFirestore) {
    this.modalColletion = this.bd.collection<Modal>('modal_datos');
  }

  enviarModal(datos: Modal) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.bd.createId();
        datos.id = id;
        const result = await this.modalColletion.doc(id).set(datos);
        resolve(result);
      } catch (error) {reject(error);}
    });
  }
}
