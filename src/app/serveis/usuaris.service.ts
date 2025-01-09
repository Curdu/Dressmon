import { Injectable } from '@angular/core';
import {Usuari} from '../model/Usuari';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {


  constructor() {
    this.getLlistaUsuaris()
    this.getUsuariActiu()
  }

  registrarUsuari(usuari: Usuari): boolean{
    let usuaris = this.getLlistaUsuaris();
    for(const i of usuaris){
      if (i.equals(usuari)){
        return false;
      }
    }
    usuaris.push(usuari);
    localStorage.setItem('usuaris', JSON.stringify(usuaris));

    return true;
  }

  iniciarSessio(usuari: Usuari): boolean{
    let usuaris = this.getLlistaUsuaris();

      for (const i of usuaris) {
        if (i.equals(usuari) && i.passwd === usuari.passwd) {
          localStorage.setItem('usuariActiu', JSON.stringify(i));
          console.log(i);
          return true;
        }
      }

    return false;
  }

  public getUsuariActiu(): Usuari{
    if(JSON.parse(localStorage.getItem('usuariActiu')!) != null) {
      let nom = JSON.parse(localStorage.getItem('usuariActiu')!).nom;
      let correu = JSON.parse(localStorage.getItem('usuariActiu')!).correu;
      let passwd = JSON.parse(localStorage.getItem('usuariActiu')!).passwd;
      return new Usuari(nom, correu, passwd);
    }
    localStorage.setItem('usuariActiu',JSON.stringify(new Usuari('null','null','null')))
    return new Usuari('null','null','null')
  }

  private getLlistaUsuaris(): Usuari[]{
    let usuaris: Usuari[] = [];
    if(JSON.parse(localStorage.getItem('usuaris')!) != null){
      for(let i of JSON.parse(localStorage.getItem('usuaris')!)){
        usuaris.push(new Usuari(i.nom,i.correu,i.passwd))
      }
    }else{
      localStorage.setItem("usuaris", JSON.stringify([new Usuari('null','null','null')]));
      usuaris.push(new Usuari('null','null','null'))
    }

    return usuaris;
  }
}
