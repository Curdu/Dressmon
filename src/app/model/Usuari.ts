import {Producte} from './Producte';

export class Usuari{
  nom: string;
  correu: string;
  passwd: string;
  cistella: Producte[];

  constructor(nom: string, correu: string, passwd: string) {
    this.nom = nom;
    this.correu = correu;
    this.passwd = passwd;
    this.cistella = [];
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
