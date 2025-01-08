import {Producte} from './Producte';

export class Usuari{
  nom: string;
  correu: string;
  passwd: string;
  cistella: Map<Producte, number>;

  constructor(nom: string, correu: string, passwd: string) {
    this.nom = nom;
    this.correu = correu;
    this.passwd = passwd;
    this.cistella = new Map<Producte, number>();
  }

   equals(other: Usuari): boolean {
    return this.nom == other.nom && this.correu == other.correu;
  }

}
