export class Producte {
  id: number;
  nom: string;
  imageUrl: string;
  preu: number;
  description: string;
  categoria: string
  mides: string[];
  constructor(id: number, nom: string, imageUrl: string, preu: number, description: string, categoria: string, mides: string[]) {
    this.id = id;
    this.nom = nom;
    this.imageUrl = imageUrl;
    this.preu = preu;
    this.description = description;
    this.categoria = categoria;
    this.mides = mides;
  }

  toString(): string {
    return `Producte{id: ${this.id}, nom: ${this.nom}, imageUrl: ${this.imageUrl}, preu: ${this.preu}, description: ${this.description}, mides: ${this.mides}}`
  }




}
