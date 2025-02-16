import { Injectable } from '@angular/core';
import { Usuari } from '../model/Usuari';
import { ProductesService } from './productes.service';
import { Producte } from '../model/Producte';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {
  private apiUrl = 'http://localhost:3333';
  private usuaris: Usuari[] = [];

  constructor(private s: ProductesService, private http: HttpClient) {
    this.getLlistaUsuaris();
    this.getUsuariActiu();
  }

  async registrarUsuari(correu: string, passwd: string, user: string, nom: string, cognoms: string, telefon: string): Promise<boolean> {
    try {
      const existeix = await this.http.post<any>(`${this.apiUrl}/comprovar`, { user, correu }).toPromise();
      if (existeix.existeix) {
        console.error("Usuari o correu ja existeixen");
        return false;
      }

      const response = await this.http.post<any>(`${this.apiUrl}/registra`, { user, nom, cognoms, correu, passwd, telefon }).toPromise();
      console.log("Usuari registrat:", response);
      return true;
    } catch (error: any) {
      console.error("Error en el registre:", error.message);
      return false;
    }
  }

  iniciarSessio(usuari: Usuari): boolean {
    let usuaris = this.getLlistaUsuaris();
    for (const i of usuaris) {
      if (i.equals(usuari) && i.passwd === usuari.passwd) {
        sessionStorage.setItem('usuariActiu', JSON.stringify(i));
        return true;
      }
    }
    return false;
  }

  afegirProducte(producte: Producte, quantitat: number): void {
    let usuariActiu = this.getUsuariActiu();
    usuariActiu.addProducte(producte, quantitat);
    sessionStorage.setItem('usuariActiu', JSON.stringify(usuariActiu));
  }

  public getUsuariActiu(): Usuari {
    let usuariData = JSON.parse(sessionStorage.getItem('usuariActiu')!);
    if (usuariData) {
      let usuari = new Usuari(usuariData.user, usuariData.correu, usuariData.passwd, usuariData.nom, usuariData.cognoms, usuariData.telefon);
      usuari.setCistella(this.parseCistella(usuariData.cistella));
      return usuari;
    }
    return new Usuari('null', 'null', 'null', 'null', 'null', 'null');
  }

  private getLlistaUsuaris(): Usuari[] {
    let usuaris: Usuari[] = JSON.parse(localStorage.getItem('usuaris')!) || [];
    return usuaris.map(i => {
      let usuari = new Usuari(i.user, i.correu, i.passwd, i.nom, i.cognoms, i.telefon);
      usuari.setCistella(i.cistella);
      return usuari;
    });
  }

  private parseCistella(cistella: Producte[]): Producte[] {
    return cistella.map(i => {
      let producte = new Producte(i.id, i.nom, i.imageUrl, i.preu, i.description, i.categoria);
      producte.quantitat = i.quantitat;
      return producte;
    });
  }

  actualitzarCistella(productes: Producte[]) {
    let usuari = this.getUsuariActiu();
    usuari.cistella = productes;
    sessionStorage.setItem('usuariActiu', JSON.stringify(usuari));
  }

  guardarUsuariLocal(): void {
    let usuaris = this.getLlistaUsuaris();
    let usuariActiu = this.getUsuariActiu();
    let index = usuaris.findIndex(u => u.correu === usuariActiu.correu);
    if (index !== -1) {
      usuaris[index] = usuariActiu;
    }
    localStorage.setItem('usuaris', JSON.stringify(usuaris));
  }
}
