import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarisService} from '../../serveis/usuaris.service';
import {Usuari} from '../../model/Usuari';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registre',
  imports: [
    FormsModule
  ],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent {

  nom : string;
  correu: string;
  passwd: string;
  passwdConfirm : string;

  constructor(private router: Router, private s: UsuarisService) {

    this.nom = "";
    this.correu = "";
    this.passwd = "";
    this.passwdConfirm  = "";

  }

  async registrarUsuari() {
    if (this.esContrasenyaConfirmada() && this.nomCorrecte() && this.correuCorrecte()) {
      const registroExitoso = await this.s.registrarUsuari(this.correu, this.passwd);
      if (registroExitoso) {
        this.router.navigate(['inicisessio']);
      } else {
        console.log("Aquest usuari ja existeix o hi ha un error en el registre");
      }
    } else {
      console.log("Les contrasenyes no coincideixen o hi ha un error");
    }
  }

  private esContrasenyaConfirmada(): boolean {
    return this.passwd === this.passwdConfirm && this.passwdConfirm !== '';
  }
  private nomCorrecte(): boolean {
    return this.nom.trim() !== '';
  }
  private correuCorrecte(): boolean {
    return this.correu.trim() !== '' && this.correu.includes('@');
  }
}
