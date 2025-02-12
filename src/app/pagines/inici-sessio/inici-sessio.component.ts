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
  styleUrl: './inici-sessio.component.css'
})
export class IniciSessioComponent {

  usuari: string;
  passwd: string;
  constructor( private s : UsuarisService, private router: Router) {
    this.usuari = "";
    this.passwd = "";

  }

  async iniciSessio(){
    if(this.usuariValid()){
      try{
        await this.s.iniciarSessio(new Usuari(this.usuari,"",this.passwd)).then();
        await this.router.navigate(['/']);


      }catch (e: any){
        console.log(e )
      }

    }
  }

  usuariValid(): boolean {
    return this.usuari !== "" && this.passwd !== ""
  }

}
