import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  partida: any;
  jogadorAtual: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.partida = this.router.getCurrentNavigation().extras.state.partida;
    } else {
      this.partida = { nick1: "Maurício", nick2: "Ketlin", online: true }
    }
    this.jogadorAtual = this.partida.nick1;
    this.partida.label1 = 'x';
    this.partida.label2 = 'o';
    this.partida.label3 = 'x';
    this.partida.label4 = 'o';
    this.partida.label5 = 'x';
    this.partida.label6 = 'o';
    this.partida.label7 = 'x';
    this.partida.label8 = 'o';
    this.partida.label9 = 'x';
    console.log(this.partida);
  }

}
