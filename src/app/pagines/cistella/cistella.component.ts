import {Component, OnInit} from '@angular/core';
import {UsuarisService} from '../../serveis/usuaris.service';
import {Producte} from '../../model/Producte';
import {FormsModule} from '@angular/forms';
import {ProducteCistellaComponent} from '../../components/producte-cistella/producte-cistella.component';

@Component({
  selector: 'app-cistella',
  imports: [
    FormsModule,
    ProducteCistellaComponent
  ],
  templateUrl: './cistella.component.html',
  styleUrl: './cistella.component.css'
})
export class CistellaComponent implements OnInit {

  productes;


  constructor(protected usuarisService: UsuarisService) {
    this.productes = usuarisService.getUsuariActiu().cistella as Producte[];
  }


  ngOnInit():void {
    window.addEventListener('beforeunload',()=>this.usuarisService.actualitzarCistella(this.productes))
    console.log(JSON.parse(sessionStorage.getItem('usuariActiu')!).cistella);
    for (let i of this.productes) {
      console.log(i as Producte);

    }
  }
  getProducteByID(id: number):Producte {
    for (const producte of this.productes) {
      if (id === producte.id) {
        return producte;
      }

    }
    return new Producte(0,"","",0,"","");
  }
  eliminarProducte(id: number):void {
    for (let producte of this.productes) {
      if (id === producte.id) {
        let index = this.productes.findIndex((x) => x.id === producte.id);
        this.productes.splice(index, 1);

      }
    }
  }
  getPreuTotal(): number{
    let suma = 0;
    this.productes.forEach(producte => {suma += producte.preu*producte.quantitat!;});
    return suma;
  }
  eliminarCistella(){
    this.usuarisService.actualitzarCistella([])
    this.productes = []
  }

}
