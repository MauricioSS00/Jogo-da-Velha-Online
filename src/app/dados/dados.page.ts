import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PartidaService } from './../partida/partida.service';

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

  constructor(
    private router: Router,
    private partidaService: PartidaService
  ) { }

  ngOnInit() {
  }

  iniciarPartida() {
    const partida: any = {
      nick1: this.nick1,
      nick2: this.nick2,
      icone1: this.icone1,
      icone2: this.icone2,
      online: this.online,
      label: [],
    };

    if (this.online) {
      partida.token = Math.floor(Math.random() * 99999999999999);
    }

    this.partidaService.novaPartida(partida);
    this.router.navigateByUrl('/partida', { state: partida });
  }

  selecionouIcone(jogador: number) {
    if (jogador == 1) {
      this.icone2 = this.icone1 == 'x' ? 'o' : 'x';
    } else {
      this.icone1 = this.icone2 == 'x' ? 'o' : 'x';
    }
  }
}
