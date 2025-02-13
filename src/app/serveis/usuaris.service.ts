import {Injectable} from '@angular/core';
import {Usuari} from '../model/Usuari';
import {ProductesService} from './productes.service';
import {Producte} from '../model/Producte';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs';
import {JwtException} from '../model/errors/JwtException';
import {jwtDecode} from 'jwt-decode';

const CLAU_USUARI_ACTIU: string = "usuariActiu";

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {



  constructor(private s: ProductesService, private http: HttpClient) {
    this.getLlistaUsuaris()
    this.getUsuariActiu()
    console.log(this.getUsuariActiu())
  }

  registrarUsuari(usuari: Usuari): boolean{
    let usuaris = this.getLlistaUsuaris();
    for(const i of usuaris){
      if (i.equals(usuari)){
        return false;
      }
    }
    usuaris.push(usuari);
    localStorage.setItem('usuaris', JSON.stringify(usuaris));

    return true;
  }

    iniciarSessio(usuario: Usuari){
    return new Promise<void>(resolve => {
      this.http.post<{ token: string }>("http://localhost:3333/login", {user: usuario.nom, password: usuario.passwd})
        .pipe(
        catchError((error: HttpErrorResponse) => {

          if (error.status === 401) {
            throw new JwtException('Credenciales incorrectas. Intente nuevamente.',error.status);
          } else if (error.status === 500) {
            throw new JwtException('Error intern del servidor.',error.status);
          }else if(error.status === 400){
            throw new JwtException("L'usuari no existeix", error.status);
          }
          else {
            throw new JwtException('Ocurrió un error desconocido.',error.status);
          }
        })
      ).subscribe(
        (token) => {
          sessionStorage.setItem('token', JSON.stringify(token));
          this.setUsuariActiu(this.obtenirPayloadToken(token.token));
          resolve();

        }
      );
    })
  }

  private decodeToken(token: string): any {
    try{
      return jwtDecode(token);
    }catch (e){
      console.log(e);
      return null;
    }
  }

  private parseUsuari(data: any): Usuari {
    if(data.user == undefined){
      new Error("L'usuari és indefinit");
    }
    else if(data.email == undefined){
      new Error("El correu és indefinida")
    }

    return new Usuari(data.user,data.email,"");
  }

  private obtenirPayloadToken(token: string): any {

    if(!token) return null;
    return this.decodeToken(token)
  }

  afegirProducte(producte: Producte, quantitat: number): void{
    let usuariActiu = this.getUsuariActiu();
    usuariActiu.addProducte(producte, quantitat);
    sessionStorage.setItem(CLAU_USUARI_ACTIU, JSON.stringify(usuariActiu));
  }
  private setUsuariActiu(usuari: any){
    sessionStorage.setItem(CLAU_USUARI_ACTIU, JSON.stringify(this.parseUsuari(usuari.data)));
  }


  public getUsuariActiu(): Usuari{
    if(JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!) != null) {
      let nom = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).nom;
      let correu = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).correu;
      let passwd = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).passwd;
      let usuari : Usuari = new Usuari(nom, correu, passwd);
      usuari.setCistella(this.parseCistella(JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).cistella));
      return usuari;
    }
    let usuari = new Usuari('null','null','null');
    usuari.addProducte(this.s.getProducteById(1)!,1);
    usuari.addProducte(this.s.getProducteById(1)!,3);
    sessionStorage.setItem(CLAU_USUARI_ACTIU,JSON.stringify(usuari));
    return usuari;
  }

  private getLlistaUsuaris(): Usuari[]{
    let usuaris: Usuari[] = [];
    if(JSON.parse(localStorage.getItem('usuaris')!) != null){
      for(let i of JSON.parse(localStorage.getItem('usuaris')!)){
        let usuari = new Usuari(i.nom,i.correu,i.passwd)
        usuari.setCistella(i.cistella)
        usuaris.push(usuari)
      }
    }else{
      localStorage.setItem("usuaris", JSON.stringify([new Usuari('null','null','null')]));
      usuaris.push(new Usuari('null','null','null'))
    }

    return usuaris;
  }
  private parseCistella(cistella: Producte[]): Producte[]{
    let novaCistella: Producte[] = []
    for (let i of cistella) {
      let producte = new Producte(i.id, i.nom, i.imageUrl, i.preu,i.description, i.categoria)
      producte.quantitat = i.quantitat;
      novaCistella.push(producte);

    }
    return novaCistella;
  }
  actualitzarCistella(productes: Producte[]){
    let usuari = this.getUsuariActiu();
    usuari.cistella = productes;
    sessionStorage.setItem(CLAU_USUARI_ACTIU,JSON.stringify(usuari));

  }
  guardarUsuariLocal():void {
    let usuaris = this.getLlistaUsuaris();
    for (let i = 0; i < usuaris.length; i++) {
      if(usuaris[i].correu === this.getUsuariActiu().correu){
        usuaris[i] = this.getUsuariActiu();
      }

    }
    localStorage.setItem('usuaris',JSON.stringify(usuaris));
  }
  recarregarDadesUsuariActiu() {
    if(sessionStorage.getItem('token')) {
      let token = JSON.parse(sessionStorage.getItem('token')!).token;
      const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
      return new Promise<Usuari>((resolve, reject) => {
        this.http.get<any>("http://localhost:3333/obtenir-dades",{headers}).subscribe(data => {
          resolve(this.parseUsuari(data));
        })
      })
    }
    return new Promise<Usuari>((resolve, reject) => {return new Usuari("","","")})

  }

  verificarToken()  {
    if(sessionStorage.getItem('token')){
      let token = JSON.parse(sessionStorage.getItem('token')!).token;
      const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
      return new Promise<void>((resolve, reject) => {
        this.http.post<any>("http://localhost:3333/verificar",{},{headers}).subscribe(
          (response) => {
            console.log(response)
            resolve();
          }

        )

      })
    }
    return new Promise<void>((resolve, reject) => {});


  }
}
