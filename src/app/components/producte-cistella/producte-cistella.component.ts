import {Component, Input} from '@angular/core';
import {Producte} from '../../model/Producte';
import {UsuarisService} from '../../serveis/usuaris.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-producte-cistella',
  imports: [
    FormsModule
  ],
  templateUrl: './producte-cistella.component.html',
  styleUrl: './producte-cistella.component.css'
})
export class ProducteCistellaComponent {

  @Input() producte!: Producte;




  constructor(private usuariServei: UsuarisService) {


  }

  actualitzarQuantitat(){
    if(this.producte.quantitat != undefined){
      let usuariActiu = this.usuariServei.getUsuariActiu();
      usuariActiu.actualitzarQuantitat(this.producte.id,this.producte.quantitat);
      this.usuariServei.actualitzarCistella(usuariActiu.cistella)
    }else{
      this.producte.quantitat = 0;
    }
    console.log(this.producte);

  }
  getPreu(){
    if(this.producte.quantitat != undefined){
      return this.producte.preu * this.producte.quantitat;
    }else{
      return 0;
    }

  }


}
