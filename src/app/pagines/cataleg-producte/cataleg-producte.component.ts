import {Component, OnInit} from '@angular/core';
import {ProductesService} from '../../serveis/productes.service';
import {ActivatedRoute} from '@angular/router';
import {Producte} from '../../model/Producte';
import {UsuarisService} from '../../serveis/usuaris.service'


@Component({
  selector: 'app-cataleg-producte',
  imports: [],
  templateUrl: './cataleg-producte.component.html',
  styleUrl: './cataleg-producte.component.css'
})
export class CatalegProducteComponent implements OnInit {

  textHTML!: HTMLElement;
  btnRestar!: HTMLElement;
  btnSumar!: HTMLElement;
  btnAfegir!: HTMLElement;
  route: ActivatedRoute;
  producte!: Producte;
  imatgeURL: string;

  quantitat: number;


  constructor(private productesServei: ProductesService, route: ActivatedRoute, private usuarisServei : UsuarisService) {
    this.route = route;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producte = productesServei.getProducteById(id)!;
    this.imatgeURL = this.producte.imageUrl
    this.quantitat = 1;

  }

  ngOnInit():void {
    this.carregarComponents()
    this.carregarEvents()
    this.textHTML.classList.add('M');
    let midesHTML = document.getElementsByClassName('mida')
    for (let midesHTMLElement of midesHTML) {

      midesHTMLElement.addEventListener('click',()=> midesHTMLElement.classList.add('seleccionada'));

    }

    this.textHTML.innerText = this.producte.toString();
    this.carregarImatge()

  }

  carregarImatge(){
    this.imatgeURL = this.producte.imageUrl
  }
  carregarComponents(){
    this.textHTML = document.getElementById('text')!;
    this.btnRestar = document.getElementById('restarBtn')!;
    this.btnSumar = document.getElementById('sumarBtn')!;
    this.btnAfegir = document.getElementById('afegirProducte')!;

  }
  carregarEvents(){
    this.btnSumar.addEventListener('click',()=> this.quantitat++);
    this.btnRestar.addEventListener('click',()=> {
      if(this.quantitat > 0){
        this.quantitat--
      }
    });
    this.btnAfegir.addEventListener('click',()=> console.log(this.quantitat));
  }
  afegirCistella(){
    this.usuarisServei.afegirProducte(this.producte,this.quantitat);
  }





}
