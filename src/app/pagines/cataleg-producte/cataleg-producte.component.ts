import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class CatalegProducteComponent implements OnInit , AfterViewInit {

  @ViewChild('restarBtn') btnRestar!: ElementRef;
  @ViewChild('sumarBtn') btnSumar!: ElementRef;
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


  }
  ngAfterViewInit():void {
    this.carregarEvents()
    this.carregarComponents()
    this.carregarImatge()
  }


  carregarImatge(){
    this.imatgeURL = this.producte.imageUrl
  }
  carregarComponents(){
    this.btnAfegir = document.getElementById('afegirProducte')!;

  }
  carregarEvents(){
    const btnSumar = this.btnSumar.nativeElement as HTMLElement;
    const btnRestar = this.btnRestar.nativeElement as HTMLElement;
    btnSumar.addEventListener('click',()=> this.quantitat++);
    btnRestar.addEventListener('click',()=> {
      if(this.quantitat > 0){
        this.quantitat--
      }
    });
  }
  afegirCistella(){
    this.usuarisServei.afegirProducte(this.producte,this.quantitat);
  }





}
