import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {

  nick1: string = '';
  nick2: string = '';
  online: boolean = false;
  icone1: string = 'x';
  icone2: string = 'o';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  iniciarPartida() {
    this.router.navigateByUrl('/partida', {
      state: {
        partida: {
          nick1: this.nick1,
          nick2: this.nick2,
          icone1: this.icone1,
          icone2: this.icone2,
          online: this.online
        }
      }
    });
  }

  selecionouIcone(jogador: number) {
    if (jogador == 1) {
      this.icone2 = this.icone1 == 'x' ? 'o' : 'x';
    } else {
      this.icone1 = this.icone2 == 'x' ? 'o' : 'x';
    }
  }
}
