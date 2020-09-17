import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DadosPage } from '../dados/dados.page';
import { HistoricoPageRoutingModule } from './historico-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoPageRoutingModule
  ],
  declarations: [DadosPage]
})
export class HistoricoPageModule {}
