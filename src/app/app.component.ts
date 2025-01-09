import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FooterComponent} from './components/footer/footer.component';
import {UsuarisService} from './serveis/usuaris.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Dressmon';
  constructor(private usuariServei: UsuarisService) {
  }

  ngOnInit() {
    window.addEventListener('beforeunload',()=>{
      this.usuariServei.guardarUsuariLocal()
    })
  }
}
