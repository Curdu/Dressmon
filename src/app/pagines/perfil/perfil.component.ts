import {Component, OnInit} from '@angular/core';
import {UsuarisService} from '../../serveis/usuaris.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  constructor(private s : UsuarisService) {

  }
  async ngOnInit() {
    console.log((await this.s.recarregarDadesUsuariActiu().then()))
  }

}
