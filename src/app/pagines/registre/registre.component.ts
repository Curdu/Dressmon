import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarisService} from '../../serveis/usuaris.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registre',
  imports: [
    FormsModule
  ],
  templateUrl: './registre.component.html',
  standalone: true,
  styleUrl: './registre.component.css'
})
export class RegistreComponent {

  usuari : string;
  correu: string;
  passwd: string;
  passwdConfirm : string;
  nom: string;
  cognom: string;
  telefon: string;

  constructor(private router: Router, private s: UsuarisService) {

    this.nom = "";
    this.correu = "";
    this.passwd = "";
    this.passwdConfirm  = "";
    this.usuari = "";
    this.cognom = "";
    this.telefon = "";

  }

  async registrarUsuari() {
    if (this.esContrasenyaConfirmada() && this.nomCorrecte() && this.correuCorrecte()) {
      const registroExitoso = await this.s.registrarUsuari(this.usuari,this.correu, this.passwd, this.nom, this.cognom, this.telefon);
      if (registroExitoso) {
        this.router.navigate(['inicisessio']);
      } else {
        console.log("Aquest usuari ja existeix o hi ha un error en el registre");
      }
    } else {
      console.log("Les contrasenyes no coincideixen o hi ha un error");
    }
  }

  private esContrasenyaConfirmada(): boolean{
    return this.passwd === this.passwdConfirm && this.passwdConfirm !== '';
  }
  private nomCorrecte(): boolean{
    return this.nom !== '';
  }
  private correuCorrecte(){
    return this.correu !== '' && this.correu.includes('@')
  }
}
