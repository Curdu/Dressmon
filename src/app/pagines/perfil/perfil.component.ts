import {Component, OnInit} from '@angular/core';
import {UsuarisService} from '../../serveis/usuaris.service';
import {FormsModule} from '@angular/forms';
import {Usuari} from '../../model/Usuari';

@Component({
  selector: 'app-perfil',
  imports: [
    FormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  usuari: Usuari;

  constructor(private s : UsuarisService) {
    this.usuari = this.s.getUsuariActiu();
    console.log(this.usuari);
  }
  async ngOnInit() {
    this.usuari = (await this.s.recarregarDadesUsuariActiu().then())
  }
  async modificarUsuari(){
    await this.s.modificarUsuari(this.usuari).then()
  }

}
