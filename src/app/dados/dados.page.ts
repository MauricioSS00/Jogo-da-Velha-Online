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
          online: this.online
        }
      }
    });
  }
}
