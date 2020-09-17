import { Component, OnInit } from '@angular/core';

import { PartidaService } from '../partida/partida.service';

@Component({
  selector: 'app-dados',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  partidas: any[] = [];

  constructor(
    private partidaService: PartidaService
  ) { }

  ngOnInit() {
    this.buscarPartidas();
  }

  async buscarPartidas() {
    const result = await this.partidaService.buscarPartidas();
    result.subscribe((a: any) => {
      this.partidas = a;
    });
  }
}
