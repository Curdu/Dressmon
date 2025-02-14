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

    this.productes.push(new Producte(1,"Dessuadora Bulbasaur","/assets/productes/sudadera-bulbasaur-600x600.jpg",19.2,"BOmboclat","Dessuadora"))
    this.productes.push(new Producte(2,"Mitjons Bulbasaur","/assets/productes/mitjonsBulbasaur.jpg",19.2,"BOmboclat","Mitjons"))
    this.productes.push(new Producte(3,"Mitjons Bulbasaur","assets/mitjonsbulbasaur.png",19.2,"BOmboclat","Mitjons"))
    this.productes.push(new Producte(4,"Mitjons Bulbasaur","assets/mitjonsbulbasaur.png",19.2,"BOmboclat","Mitjons"))
    this.productes.push(new Producte(5,"Pantufles de Snorlax","/assets/Pantuflas/pantuflas-snorlax-600x600.jpg",24.99,"Les pantufles més còmodes per relaxar-te com un Snorlax.","Pantuflas" ))
    this.productes.push(new Producte(6,"Gorra Pikachu Classic","/assets/Gorras/gorra-de-pikachu-con-orejas-600x600.jpg",14.99,"Perfecta per als fans de Pikachu. Un toc divertit per als teus outfits!","Gorras"))
    this.productes.push(new Producte(7,"Samarreta Bulbasaur Edition","/assets/Camiseta/camiseta-bulbasaur-2-600x600.jpg",19.99,"Una samarreta verda amb un disseny únic de Bulbasaur.","Samarretas"))
    this.productes.push(new Producte(8,"Samarreta Magikarp","/assets/Camiseta/camiseta-magikarp-2-600x600.jpg",19.99,"Una samarreta amb la imatge del popular Pokémon Magikarp, conegut per la seva capacitat de transformar-se en Gyarados. Ideal per als amants de la saga Pokémon!","Samarretas"))
    this.productes.push(new Producte(9,"Samarreta Eevee","/assets/Camiseta/camiseta-de-eevee-2-600x600.jpg",22.99,"Una samarreta amb el disseny de l'encantador Eevee, el Pokémon amb moltes evolucions diferents. Perfecta per a tots els fans del món Pokémon.","Samarretas"))
    this.productes.push(new Producte(10,"Gorra Pokémon Go","/assets/Gorras/gorra-pokemon-go-amarilla-600x600.jpg",16.99,"Una gorra amb el disseny inspirat en el popular joc Pokémon Go. Ideal per a aquells que volen gaudir de la seva aventura Pokémon mentre juguen a l'exterior.","Gorra"))
    this.productes.push(new Producte(11,"Gorra Roja Pokémon","/assets/Gorras/gorra-roja-pokemon-600x600.jpg",14.99," Gorra de color vermell amb un disseny subtil relacionat amb Pokémon. Perfecte per a les teves sortides casuals i aventures diàries.","Gorra"))
    this.productes.push(new Producte(12,"Mitjons Charmander","/assets/Mitjons/calcetines-charmander-charizard-600x600.jpg",9.99,"Mitjons de cotó amb la imatge de Charmander, el Pokémon de foc. Una manera còmoda i original de mostrar el teu amor per Pokémon.","Mitjons"))
    this.productes.push(new Producte(13,"Mitjons Pidgey","/assets/Mitjons/calcetines-pidgey-600x600.jpg",8.99," Mitjons inspirats en Pidgey, un dels primers Pokémon de la saga. Aquests mitjons són perfectes per a aficionats i jugadors que volen afegir una mica de Pokémon a les seves rutines.","Mitjons"))
    this.productes.push(new Producte(14,"Mitjons Squirtle","/assets/Mitjons/calcetines-squirtle-600x600.jpg",7.99,"Mitjons amb el disseny de Squirtle, el Pokémon aquàtic de la primera generació. Confortables i divertits per als amants de la saga.","Mitjons"))
    this.productes.push(new Producte(16,"Pantufles Vaporeon","/assets/Pantuflas/pantuflas-de-vaporeon-600x600.jpg",22.99,"Pantufles inspirades en Vaporeon, el Pokémon aquàtic d'Eevee. Un complement perfecte per a descansar a casa després de les teves aventures.","Pantufles"))
    this.productes.push(new Producte(15,"Pantufles Mudkip","/assets/Pantuflas/pantuflas-mudkip-600x600.jpg",24.99,"Pantufles suaus i còmodes amb el disseny de Mudkip, un dels Pokémon inicials de la regió Hoenn. Ideal per a mantenir els teus peus càlids i amb estil.","Pantufles"))
    this.productes.push(new Producte(17,"Dessuador Lucario","/assets/Sudadera/sudadera-lucario-1.jpg",39.99,"Un dessuador amb el disseny de Lucario, un dels Pokémon més elegants i poderosos de la saga. Ideal per a estar calent i amb estil.","Dessuadora"))
    this.productes.push(new Producte(18,"Dessuador Charmander","/assets/Sudadera/sudadera-charmander.jpg",35.99,"Dessuador amb el dibuix de Charmander, el Pokémon de foc. Perfecte per a aquells que volen combinar confort i passió per Pokémon.","Dessuadora"))
    this.productes.push(new Producte(19,"Dessuador Eevee","/assets/Sudadera/sudadera-eevee.jpg",32.99," Dessuador amb la imatge d’Eevee, el Pokémon que pot evolucionar en diverses formes. Un disseny modern per a tots els amants de la franquícia Pokémon.","Dessuadora"))
  }
  getAllCategories(): string[] {
    let categories: string[] = [];
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
