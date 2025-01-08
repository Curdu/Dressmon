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
  imatgeURL: string;
  midaSeleccionada: string;
  quantitat: number;


  constructor(productesServei: ProductesService, route: ActivatedRoute) {
    this.productesServeis = productesServei;
    this.route = route;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producte = this.productesServeis.getProducteById(id)!;
    this.imatgeURL = this.producte.imageUrl
    this.midaSeleccionada = this.producte.mides[0];
    this.quantitat = 1;

  }

  ngOnInit():void {
    this.textHTML = document.getElementById('text')!;

    this.textHTML.classList.add('M');
    let midesHTML = document.getElementsByClassName('mida')
    for (let midesHTMLElement of midesHTML) {

      midesHTMLElement.addEventListener('click',()=> midesHTMLElement.classList.add('seleccionada'));

    }

    this.textHTML.innerText = this.producte.toString();
    this.carregarImatge()
    //let midaHTML = document.getElementById(this.midaSeleccionada)!;
    //midaHTML.classList.add('seleccionada');
    //this.seleccionarMida(this.midaSeleccionada)
  }

  carregarImatge(){
    this.imatgeURL = this.producte.imageUrl
  }

  seleccionarMida(id: string){
    let midaAnterior = document.getElementById(this.midaSeleccionada)!;
    midaAnterior.classList.remove('seleccionada');
    let midaHTML = document.getElementById(id)!;
    midaHTML.classList.add('seleccionada');
    this.midaSeleccionada = id;
  }



}
