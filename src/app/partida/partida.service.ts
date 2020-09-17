import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  constructor(
    private afs: AngularFirestore
  ) { }

  async novaPartida(partida: any) {
    const id = this.afs.createId();
    partida.id = id;
    this.afs.collection('partidas').doc(id).set(partida);
    return id;
  }

  async atualizarPartida(partida: any) {
    this.afs.collection('partidas').doc(partida.id).update(partida);
    return partida.id;
  }

  async buscarPartidaPorCampo(campo: string, value: any) {
    return this.afs.collection('partidas', ref => ref.where(campo, '==', value)).valueChanges();
  }

  async buscarPartidas() {
    return this.afs.collection('partidas').valueChanges();
  }
}
