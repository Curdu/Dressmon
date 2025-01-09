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

  registrarUsuari(){

    if(this.esContrasenyaConfirmada() && this.nomCorrecte() && this.correuCorrecte()){
      if(this.s.registrarUsuari(new Usuari(this.nom, this.correu, this.passwd))){
        this.router.navigate(['inicisessio']);
      }else {
        console.log("Aquest usuari ja existeix")
      }
    }else{
      console.log("Les contrasenyes no coincideixen")
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
