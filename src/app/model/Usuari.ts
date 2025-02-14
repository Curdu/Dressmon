import {Producte} from './Producte';

export class Usuari{
  user: string;
  correu: string;
  passwd: string;
  telefon?: string;
  nom: string;
  cognoms: string;
  cistella: Producte[];

  constructor(user: string, nom: string, cognoms: string ,correu: string, passwd: string, telefon? : string) {
    this.user = user;
    this.correu = correu;
    this.passwd = passwd;
    this.cistella = [];
    this.telefon = telefon;
    this.nom = nom;
    this.cognoms = cognoms;
  }

   equals(other: Usuari): boolean {
    return this.correu === other.correu;
  }

  setCistella(cistella: Producte[]) {
    this.cistella = cistella;
  }
  actualitzarQuantitat(id: number, quantitat: number) {
    for(let i = 0; i < this.cistella.length; i++) {
      if(this.cistella[i].id === id){
        this.cistella[i].quantitat = quantitat;
      }
    }

  }

  addProducte(producte: Producte, quantity: number) {
    if(quantity > 0){
      let esTroba = false;
      for(let i of this.cistella) {
        if(i.id === producte.id) {
          i.quantitat! += quantity;
          esTroba = true;
        }
      }
      if(!esTroba){
        producte.quantitat = quantity;
        this.cistella.push(producte);
      }
    }
  }



}
