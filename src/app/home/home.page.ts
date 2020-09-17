import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) { }

  abrirDadosPartida() {
    this.router.navigate(['dados']);
  }

  entrarPartida() {
    this.router.navigateByUrl('/dados', { state: { acessarPartida: true } });
  }

  historicoPartidas() {
    this.router.navigate(['historico']);
  }
}
