import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JSONPath} from 'jsonpath-plus';


@Component({
  selector: 'app-inici',
  imports: [

  ],
  templateUrl: './inici.component.html',
  styleUrl: './inici.component.css'
})
export class IniciComponent implements OnInit {
    imatgePokemon: string;
    nomPokemon: string;

    constructor(private http: HttpClient) {
      this.imatgePokemon = '';
      this.nomPokemon = '';
    }
    async ngOnInit() {
      await this.carregarPokemon().then((response)=>{
        this.imatgePokemon = JSONPath({path: "$.sprites.other.official-artwork.front_default", json: response})[0];
        this.nomPokemon = JSONPath({path: "$.forms.[0].name", json: response})[0].toUpperCase();

      })

    }

    carregarPokemon() {
      return new Promise<any>(resolve => {
        this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${this.numeroRandom()}`).subscribe(
          (res) =>{
            resolve(res);
          }
        )
      })
    }

    numeroRandom(): number {
      return Math.floor(Math.random() * 1024);
    }

}
