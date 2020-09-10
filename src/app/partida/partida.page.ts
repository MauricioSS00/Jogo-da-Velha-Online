import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PartidaService } from './partida.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  partida: any;
  jogadorAtual: string;
  iconeAtual: string;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private partidaService: PartidaService
  ) { }

  ngOnInit() {
    this.partida = this.router.getCurrentNavigation().extras.state;
    this.jogadorAtual = this.partida.nick1;
    this.iconeAtual = this.partida.icone1;
  }

  async jogar(label: number) {
    if (!this.partida.label[label]) {
      this.partida.label[label] = this.iconeAtual;
      const resultado = await this.checarVitoria();
      if (!resultado) {
        const velha = await this.checarVelha();
        if (!velha) {
          this.alternarJogador();
        } else {
          this.exibirAlerta('Não foi dessa Vez!', `Ninguém ganhou, que pena, mas vamos para a proxima!`);
        }
      } else {
        this.exibirAlerta('Vitória!!!!', `Parabéns ${this.jogadorAtual} pela vitória!`);
      }
    }
  }

  alternarJogador() {
    if (this.jogadorAtual == this.partida.nick1) {
      this.jogadorAtual = this.partida.nick2;
      this.iconeAtual = this.partida.icone2;
    } else {
      this.jogadorAtual = this.partida.nick1;
      this.iconeAtual = this.partida.icone1;
    }
  }

  async checarVitoria() {
    if (this.partida.label[1] && this.partida.label[1] == this.partida.label[2] && this.partida.label[1] == this.partida.label[3]) {
      return true;
    } else if (this.partida.label[4] && this.partida.label[4] == this.partida.label[5] && this.partida.label[4] == this.partida.label[6]) {
      return true;
    } else if (this.partida.label[7] && this.partida.label[7] == this.partida.label[8] && this.partida.label[7] == this.partida.label[9]) {
      return true;
    } else if (this.partida.label[1] && this.partida.label[1] == this.partida.label[4] && this.partida.label[1] == this.partida.label[7]) {
      return true;
    } else if (this.partida.label[2] && this.partida.label[2] == this.partida.label[5] && this.partida.label[2] == this.partida.label[8]) {
      return true;
    } else if (this.partida.label[3] && this.partida.label[3] == this.partida.label[6] && this.partida.label[3] == this.partida.label[9]) {
      return true;
    } else if (this.partida.label[1] && this.partida.label[1] == this.partida.label[5] && this.partida.label[1] == this.partida.label[9]) {
      return true;
    } else if (this.partida.label[3] && this.partida.label[3] == this.partida.label[5] && this.partida.label[3] == this.partida.label[7]) {
      return true;
    }
    return false;
  }

  async checarVelha() {
    if (this.partida.label[1] && this.partida.label[2] && this.partida.label[3] &&
      this.partida.label[4] && this.partida.label[5] && this.partida.label[6] &&
      this.partida.label[7] && this.partida.label[8] && this.partida.label[9]) {
      return true;
    }
    return false;
  }

  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
