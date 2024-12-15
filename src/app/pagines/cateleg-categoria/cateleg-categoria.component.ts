import {Component, OnInit} from '@angular/core';
import {ProductesService} from '../../serveis/productes.service';
import {ActivatedRoute} from '@angular/router';
import {Producte} from '../../model/Producte';

@Component({
  selector: 'app-cateleg-categoria',
  imports: [],
  templateUrl: './cateleg-categoria.component.html',
  styleUrl: './cateleg-categoria.component.css'
})
export class CatelegCategoriaComponent implements OnInit {

  productes: Producte[];
  categoria: string | null;

  constructor(private producteService: ProductesService, private route: ActivatedRoute) {
    this.categoria = "";
    this.productes = [];
  }



  ngOnInit():void {
    this.categoria = this.route.snapshot.paramMap.get('cat')!;
    this.productes = this.producteService.getProductesByCategoria(this.categoria)


  }

}
