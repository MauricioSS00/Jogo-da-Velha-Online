import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PartidaService } from './partida.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  partida: any;
  alertSegJogador: any;
  alertAgurdAdv: any;
  jogador: number;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private partidaService: PartidaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.partida = this.router.getCurrentNavigation().extras.state;
    if (this.activatedRoute.snapshot.params.codJogador) {
      this.jogador = this.activatedRoute.snapshot.params.codJogador;
    } else {
      this.jogador = 1;
    }
    this.partida.jogadorAtual = this.partida.nick1;
    this.partida.iconeAtual = this.partida.icone1;
    this.buscarPartida();
  }

  async buscarPartida() {
    const partida = await this.partidaService.buscarPartidaPorCampo('id', this.partida.id);
    partida.subscribe((a: any) => {
      if (a[0]) {
        this.partida = a[0];
        if (this.partida.segundoJogador) {
          if (this.partida.rodada > 0) {
            this.validarJogada();
          } else {
            if (this.partida.jogador != this.jogador) {
              this.aguardaSuaVez();
            }
          }
          if (this.alertSegJogador) {
            this.alertSegJogador.dismiss();
          }
          this.checarVitoria();
        } else {
          this.aguardandoJogador();
        }
        if (this.partida.jogador == this.jogador) {
          if (this.alertAgurdAdv) {
            this.alertAgurdAdv.dismiss();
          }
        }
      }
    });
  }

  async jogar(label: number) {
    let jogou = false;
    switch (label) {
      case 0:
        if (!this.partida.label0) {
          this.partida.label0 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      case 1:
        if (!this.partida.label1) {
          this.partida.label1 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      case 2:
        if (!this.partida.label2) {
          this.partida.label2 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      case 3:
        if (!this.partida.label3) {
          this.partida.label3 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      case 4:
        if (!this.partida.label4) {
          this.partida.label4 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      case 5:
        if (!this.partida.label5) {
          this.partida.label5 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      case 6:
        if (!this.partida.label6) {
          this.partida.label6 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      case 7:
        if (!this.partida.label7) {
          this.partida.label7 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
      default:
        if (!this.partida.label8) {
          this.partida.label8 = this.partida.iconeAtual;
          jogou = true;
        }
        break;
    }
    if (jogou) {
      this.partida.rodada++;
      this.partida.jogador = this.partida.jogador == 1 ? 2 : 1;
      this.partidaService.atualizarPartida(this.partida);
      this.aguardaSuaVez();
      const resultado = await this.checarVitoria();
      if (!resultado) {
        const velha = await this.checarVelha();
        if (!velha) {
          this.alternarJogador();
        } else {
          this.exibirAlerta('Não foi dessa Vez!', `Ninguém ganhou, que pena, mas vamos para a proxima!`);
        }
      } else {
        this.exibirAlerta('Vitória!!!!', `Parabéns ${this.partida.jogadorAtual} pela vitória!`);
      }
    }
  }

  async validarJogada() {
    const resultado = await this.checarVitoria();
    if (!resultado) {
      const velha = await this.checarVelha();
      if (!velha) {
        this.alternarJogador();
      } else {
        this.exibirAlerta('Não foi dessa Vez!', `Ninguém ganhou, que pena, mas vamos para a proxima!`);
      }
    } else {
      this.exibirAlerta('Vitória!!!!', `Parabéns ${this.partida.jogadorAtual} pela vitória!`);
    }
  }

  alternarJogador() {
    if (this.partida.jogadorAtual == this.partida.nick1) {
      this.partida.jogadorAtual = this.partida.nick2;
      this.partida.iconeAtual = this.partida.icone2;
    } else {
      this.partida.jogadorAtual = this.partida.nick1;
      this.partida.iconeAtual = this.partida.icone1;
    }
  }

  async checarVitoria() {
    if (this.partida.label0 && this.partida.label0 == this.partida.label1 && this.partida.label0 == this.partida.label2) {
      return true;
    } else if (this.partida.label3 && this.partida.label3 == this.partida.label4 && this.partida.label3 == this.partida.label5) {
      return true;
    } else if (this.partida.label6 && this.partida.label6 == this.partida.label7 && this.partida.label6 == this.partida.label8) {
      return true;
    } else if (this.partida.label0 && this.partida.label0 == this.partida.label3 && this.partida.label0 == this.partida.label6) {
      return true;
    } else if (this.partida.label1 && this.partida.label1 == this.partida.label4 && this.partida.label1 == this.partida.label7) {
      return true;
    } else if (this.partida.label2 && this.partida.label2 == this.partida.label5 && this.partida.label2 == this.partida.label8) {
      return true;
    } else if (this.partida.label0 && this.partida.label0 == this.partida.label4 && this.partida.label0 == this.partida.label8) {
      return true;
    } else if (this.partida.label2 && this.partida.label2 == this.partida.label4 && this.partida.label2 == this.partida.label6) {
      return true;
    }
    return false;
  }

  async checarVelha() {
    if (this.partida.label0 && this.partida.label1 && this.partida.label2 &&
      this.partida.label3 && this.partida.label4 && this.partida.label5 &&
      this.partida.label6 && this.partida.label7 && this.partida.label8) {
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

  async aguardandoJogador() {
    this.alertSegJogador = await this.alertController.create({
      header: 'Aguardando Segundo Jogador',
      message: 'Aguardando o segundo jogador acessar, assim que ele entrar será fechado essa mensagem.',
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {
          type: 'text',
          disabled: true,
          value: this.partida.token
        }
      ],
      buttons: [
        {
          text: 'Copiar Token',
          handler: () => {
            this.aguardandoJogador();
            const selBox = document.createElement('textarea');
            selBox.style.position = 'fixed';
            selBox.style.left = '0';
            selBox.style.top = '0';
            selBox.style.opacity = '0';
            selBox.value = this.partida.token;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
          }
        }
      ]
    });
    this.alertSegJogador.present();
  }

  async aguardaSuaVez() {
    this.alertAgurdAdv = await this.alertController.create({
      header: 'Rodada do Adversário',
      message: 'Aguarde seu Adversário jogar.',
      backdropDismiss: false,
    });
    this.alertAgurdAdv.present();
  }
}
