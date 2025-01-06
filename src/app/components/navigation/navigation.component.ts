import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent  implements OnInit {

  iniciSessio!: HTMLElement;
  iconaUsuari!: HTMLElement;

  constructor() {

  }

  ngOnInit() {
    this.carregarElements()
    this.iniciSessio.addEventListener('mouseover', () => {
      this.iconaUsuari.style.backgroundImage = "url(/assets/iconaUsuariHover.png)"
    })
    this.iniciSessio.addEventListener('mouseout', () => {
      this.iconaUsuari.style.backgroundImage = "url(/assets/iconaUsuari.png)"
    })
  }

  carregarElements(): void {
    this.iniciSessio = document.getElementById('usuari')!;
    this.iconaUsuari = document.getElementById('iconaUsuari')!;
  }

}
