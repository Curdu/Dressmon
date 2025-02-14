import { Component } from '@angular/core';
import {UsuarisService} from '../../serveis/usuaris.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-canviar-contrasenya',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './canviar-contrasenya.component.html',
  styleUrl: './canviar-contrasenya.component.css'
})
export class CanviarContrasenyaComponent {

  token: string;
  contrasenya: string;
  contrasenyaRepe: string

  constructor(private s: UsuarisService, private router: ActivatedRoute, private route: Router) {
    this.token = this.router.snapshot.paramMap.get('token')!
    this.contrasenya = "";
    this.contrasenyaRepe = "";
  }

  async canviarContrasena(){
    try{
      await this.s.cambiarContrasenya(this.contrasenya, this.token).then()

      await this.route.navigate(['/inicisessio']);


    }catch(error){
      console.error(error);
    }
  }

}
