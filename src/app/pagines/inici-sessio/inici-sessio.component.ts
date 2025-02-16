import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UsuarisService} from '../../serveis/usuaris.service';
import {Usuari} from '../../model/Usuari';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inici-sessio',
  imports: [
    FormsModule
  ],
  templateUrl: './inici-sessio.component.html',
  standalone: true,
  styleUrl: './inici-sessio.component.css'
})
export class IniciSessioComponent {

  correu: string;
  passwd: string;
  constructor( private s : UsuarisService, private router: Router) {
    this.correu = "";
    this.passwd = "";

  }

  iniciSessio(): void{
    if(this.s.iniciarSessio(new Usuari("", this.correu, this.passwd, "", "", ""))){
      console.log("Inici de sessió correcte")
      this.router.navigate(["/inici"])
    }else{
      console.log("Inici de sessió incorrecte")
    }


  }

}
