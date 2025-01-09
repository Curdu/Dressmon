import { Injectable } from '@angular/core';
import {Producte} from '../model/Producte';

@Injectable({
  providedIn: 'root'
})
export class ProductesService {

  productes: Producte[];

  constructor() {
    this.productes = [];
    this.generateProductes();

  }

  private generateProductes(): void {
    this.productes.push(new Producte(0,"Mitjons Bulbasaur","/assets/productes/sudadera-bulbasaur-600x600.jpg",19.2,"BOmboclat","Mitjons",["XS","S","M","L"]))
    this.productes.push(new Producte(1,"Dessuadora Bulbasaur","/assets/productes/sudadera-bulbasaur-600x600.jpg",19.2,"BOmboclat","Dessuadora",["XS","S","M","L"]))
    this.productes.push(new Producte(2,"Mitjons Bulbasaur","assets/mitjonsbulbasaur.png",19.2,"BOmboclat","Mitjons",["XS","S","M","L"]))
    this.productes.push(new Producte(3,"Mitjons Bulbasaur","assets/mitjonsbulbasaur.png",19.2,"BOmboclat","Mitjons",["XS","S","M","L"]))
    this.productes.push(new Producte(4,"Mitjons Bulbasaur","assets/mitjonsbulbasaur.png",19.2,"BOmboclat","Mitjons",["XS","S","M","L"]))
  }
  getAllCategories(): String[] {
    let categories: String[] = [];
    for (const producte of this.productes) {
      if(!categories.includes(producte.categoria)){
        categories.push(producte.categoria);
      }
    }
    return categories;
  }
  getProductesByCategoria(categoria: string): Producte[] {
    return this.productes.filter((producte) => producte.categoria === categoria);
  }
  getProducteById(id: number): Producte | undefined {
    return this.productes.find((producte) => producte.id === id);
  }
}
