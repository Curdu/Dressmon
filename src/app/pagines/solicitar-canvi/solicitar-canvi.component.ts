import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UsuarisService} from '../../serveis/usuaris.service';

@Component({
  selector: 'app-solicitar-canvi',
  imports: [
    FormsModule
  ],
  templateUrl: './solicitar-canvi.component.html',
  styleUrl: './solicitar-canvi.component.css'
})
export class SolicitarCanviComponent {

  correu: string;

  constructor(private s : UsuarisService) {
    this.correu = "";
  }

  async solicitarCanvi(){
    await this.s.solicitarCanviContrasenya(this.correu).then()
  }

}
