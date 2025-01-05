import {Component, OnInit} from '@angular/core';
import {ProductesService} from '../../serveis/productes.service';
import {ActivatedRoute} from '@angular/router';
import {Producte} from '../../model/Producte';

@Component({
  selector: 'app-cataleg-producte',
  imports: [],
  templateUrl: './cataleg-producte.component.html',
  styleUrl: './cataleg-producte.component.css'
})
export class CatalegProducteComponent implements OnInit {

  textHTML!: HTMLElement;
  productesServeis: ProductesService;
  route: ActivatedRoute;
  producte!: Producte;

  constructor(productesServei: ProductesService, route: ActivatedRoute) {
    this.productesServeis = productesServei;
    this.route = route;

  }

  ngOnInit():void {
    this.textHTML = document.getElementById('text')!;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producte = this.productesServeis.getProducteById(id)!;
    this.textHTML.innerText = this.producte.toString();
    this.carregarImatge()
  }

  carregarImatge(){
    document.getElementById("imatge")!.style.backgroundImage = 'url(' + this.producte.imageUrl + ')';
  }


}
