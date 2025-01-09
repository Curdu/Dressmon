import { Injectable } from '@angular/core';
import {Usuari} from '../model/Usuari';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {

  usuariActiu: Usuari;
  usuaris: Usuari[];

  constructor() {

    this.usuariActiu = new Usuari("null","null","null");
    this.usuaris = [];
    this.usuaris.push(new Usuari("RaulVidal","raulvidal@gmail.com", "admin123"));
    this.usuaris.push(new Usuari("Admin","admin@gmail.com", "admin"));
    this.usuaris.push(new Usuari("Patata","patata@gmail.com", "patata"));
    this.usuaris.push(new Usuari("AdriaTregon","adriatregon@gmail.com", "admin123"));
    this.usuaris.push(new Usuari("AlexisAlmansa","alexisalmansa@gmail.com", "admin123"));
    this.usuaris.push(new Usuari("Curdu","curdu@gmail.com", "admin"));

  }


  registrarUsuari(usuari: Usuari): boolean{
    for(const i of this.usuaris){
      if (i.equals(usuari)){
        return false;
      }
    }
    this.usuaris.push(usuari);
    return true;
  }

   iniciarSessio(usuari: Usuari): boolean{
    for (const i of this.usuaris) {
      if (i.equals(usuari) && i.passwd === usuari.passwd){
        this.usuariActiu = i;
        console.log(this.usuariActiu);
        return true;
      }
    }
    return false;
  }
}
