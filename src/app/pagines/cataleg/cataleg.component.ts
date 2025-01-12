import { Component } from '@angular/core';
import {ProductesService} from '../../serveis/productes.service';

@Component({
  selector: 'app-cataleg',
  imports: [],
  templateUrl: './cataleg.component.html',
  standalone: true,
  styleUrl: './cataleg.component.css'
})
export class CatalegComponent {
  llistaCategories: string[]
  constructor(private productesServei: ProductesService) {
    this.llistaCategories = productesServei.getAllCategories()
  }

}
