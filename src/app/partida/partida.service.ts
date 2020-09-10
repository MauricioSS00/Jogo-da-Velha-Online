import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  private partida: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.partida = this.afs.collection<any>('partidas');
  }

  public novaPartida(partida: any) {
    const id = this.afs.createId();
    this.partida.doc(id).set({ partida });
    return id;
  }
}
