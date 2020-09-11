import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PartidaService } from './../partida/partida.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {

  nick1 = '';
  nick2 = '';
  online = false;
  icone1 = 'x';
  icone2 = 'o';

  idPartida: string;
  acessandoPartida = false;
  partidaLocalizada = false;
  token = 0;

  constructor(
    private router: Router,
    private partidaService: PartidaService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.acessandoPartida = this.router.getCurrentNavigation().extras.state.acessarPartida;
    }
  }

  async iniciarPartida() {
    const partida: any = {
      nick1: this.nick1,
      nick2: this.nick2,
      icone1: this.icone1,
      icone2: this.icone2,
      online: this.online,
      jogador: 1,
    };

    if (this.online) {
      partida.token = Math.floor(Math.random() * 99999999999999);
    }
    const id = await this.partidaService.novaPartida(partida);
    partida.id = id;
    this.router.navigateByUrl('/partida/', { state: partida });
  }

  selecionouIcone(jogador: number) {
    if (jogador == 1) {
      this.icone2 = this.icone1 == 'x' ? 'o' : 'x';
    } else {
      this.icone1 = this.icone2 == 'x' ? 'o' : 'x';
    }
  }

  async buscarPartida() {
    const partida = await this.partidaService.buscarPartidaPorCampo('token', Number(this.token));
    partida.subscribe((a: any) => {
      if (a[0]) {
        this.nick1 = a[0].nick1;
        this.online = true;
        this.icone1 = a[0].icone1;
        this.icone2 = a[0].icone2;
        this.partidaLocalizada = true;
        this.idPartida = a[0].id;
        this.exibirToast('Partida encontrada!', 'Preencha seu nome para acessar o jogo.');
      } else {
        this.exibirToast('Partida não encontrada!', 'Verfique o código digitado.');
      }
    });
  }

  async acessarPartida() {
    const partida: any = {
      nick1: this.nick1,
      nick2: this.nick2,
      icone1: this.icone1,
      icone2: this.icone2,
      online: this.online,
      segundoJogador: true,
      id: this.idPartida,
      jogadorAtual: this.nick1,
      iconeAtual: this.icone1,
      rodada: 0
    };
    const id = await this.partidaService.atualizarPartida(partida);
    partida.id = id;
    this.router.navigateByUrl('/partida/2', { state: partida });
  }

  async exibirToast(titulo: string, mensagem: string) {
    const toast = await this.toastController.create({
      header: titulo,
      message: mensagem,
      position: 'bottom',
    });
    toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  }
}
