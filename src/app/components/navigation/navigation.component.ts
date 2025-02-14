import {Component, OnInit} from '@angular/core';
import {UsuarisService} from '../../serveis/usuaris.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent  implements OnInit {

  iniciSessio!: HTMLElement;
  iconaUsuari!: HTMLElement;

  constructor(public s : UsuarisService, private router: Router) {
    this.s.verificarToken().then();
  }

  async ngOnInit() {
    await this.s.recarregarDadesUsuariActiu();
    this.carregarElements()
    this.iniciSessio.addEventListener('mouseover', () => {
      this.iconaUsuari.style.backgroundImage = "url(/assets/iconaUsuariHover.png)"
    })
    this.iniciSessio.addEventListener('mouseout', () => {
      this.iconaUsuari.style.backgroundImage = "url(/assets/iconaUsuari.png)"
    })
    this.iniciSessio.addEventListener('click', async () => {
      console.log('click');
      if(this.s.getUsuariActiu().user === 'null'){
        await this.router.navigate(['/inicisessio']).then();

      }else {
        await this.router.navigate(['/perfil']).then();
      }
    })

  }
  async clicarElement() {
    console.log('click');
    if(this.s.getUsuariActiu().user === 'null'){
      await this.router.navigate(['/inicisessio']).then();

    }else {
      await this.router.navigate(['/perfil']).then();
    }
  }


  carregarElements(): void {
    this.iniciSessio = document.getElementById('usuari')!;
    this.iconaUsuari = document.getElementById('iconaUsuari')!;
  }



}
