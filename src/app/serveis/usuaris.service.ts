import { Injectable } from '@angular/core';
import {Usuari} from '../model/Usuari';
import {ProductesService} from './productes.service';
import {Producte} from '../model/Producte';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {


  constructor(private s: ProductesService) {
    this.getLlistaUsuaris()
    this.getUsuariActiu()
    console.log(this.getUsuariActiu())
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
          sessionStorage.setItem('usuariActiu', JSON.stringify(i));
          console.log(i);
          return true;
        }
      }

    return false;
  }
  afegirProducte(producte: Producte, quantitat: number): void{
    let usuariActiu = this.getUsuariActiu();
    usuariActiu.addProducte(producte, quantitat);
    sessionStorage.setItem('usuariActiu', JSON.stringify(usuariActiu));
  }

  public getUsuariActiu(): Usuari{
    if(JSON.parse(sessionStorage.getItem('usuariActiu')!) != null) {
      let nom = JSON.parse(sessionStorage.getItem('usuariActiu')!).nom;
      let correu = JSON.parse(sessionStorage.getItem('usuariActiu')!).correu;
      let passwd = JSON.parse(sessionStorage.getItem('usuariActiu')!).passwd;
      let usuari : Usuari = new Usuari(nom, correu, passwd);
      usuari.setCistella(JSON.parse(sessionStorage.getItem('usuariActiu')!).cistella);
      return usuari;
    }
    let usuari = new Usuari('null','null','null');
    usuari.addProducte(this.s.getProducteById(1)!,1);
    usuari.addProducte(this.s.getProducteById(1)!,3);
    sessionStorage.setItem('usuariActiu',JSON.stringify(usuari));
    return usuari;
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
