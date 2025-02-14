import {Component, OnInit} from '@angular/core';
import {UsuarisService} from '../../serveis/usuaris.service';
import {FormsModule} from '@angular/forms';
import {Usuari} from '../../model/Usuari';
import {Router} from '@angular/router';

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

  constructor(private s : UsuarisService, private router: Router) {
    this.usuari = this.s.getUsuariActiu();
    console.log(this.usuari);
  }
  async ngOnInit() {
    this.usuari = (await this.s.recarregarDadesUsuariActiu().then())
  }
  async modificarUsuari(){
    await this.s.modificarUsuari(this.usuari).then()
  }
  async tancarSessio(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuariActiu');
    await this.router.navigate(['/inici'])

  }

}
