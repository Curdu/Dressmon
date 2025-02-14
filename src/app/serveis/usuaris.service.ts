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
    this.getUsuariActiu()
    console.log(this.getUsuariActiu())
  }

  registrarUsuari(usuari: Usuari): boolean{
    return false;
  }

    iniciarSessio(usuario: Usuari){
    return new Promise<void>(resolve => {
      this.http.post<{ token: string }>("http://localhost:3333/login", {user: usuario.user, password: usuario.passwd})
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

    return new Usuari(data.user,data.nom,data.cognoms,data.email,"",data.telefon);
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
    sessionStorage.setItem(CLAU_USUARI_ACTIU, JSON.stringify(this.parseUsuari(usuari)));
  }


  public getUsuariActiu(): Usuari{
    if(JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!) != null) {
      let user = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).user;
      let correu = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).correu;
      let passwd = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).passwd;
      let nom = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).nom;
      let cognoms = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).cognoms;
      let telefon = JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).telefon;
      let usuari : Usuari = new Usuari(user,nom,cognoms,correu,"",telefon);
      usuari.setCistella(this.parseCistella(JSON.parse(sessionStorage.getItem(CLAU_USUARI_ACTIU)!).cistella));
      return usuari;
    }
    let usuari = new Usuari('null','null','null','null','null','null');
    usuari.addProducte(this.s.getProducteById(1)!,1);
    usuari.addProducte(this.s.getProducteById(1)!,3);
    sessionStorage.setItem(CLAU_USUARI_ACTIU,JSON.stringify(usuari));
    return usuari;
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

  }
  recarregarDadesUsuariActiu() {
    if(sessionStorage.getItem('token')) {
      let token = JSON.parse(sessionStorage.getItem('token')!).token;
      const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
      return new Promise<Usuari>((resolve, reject) => {
        this.http.get<any>("http://localhost:3333/obtenir-dades",{headers}).subscribe(data => {
          this.setUsuariActiu(data);
          resolve(this.parseUsuari(data));
        })
      })
    }
    return new Promise<Usuari>((resolve, reject) => {return new Usuari("","","","","","")})

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

  modificarUsuari(usuari: Usuari){
   return new Promise<void>(async (resolve, reject) => {
     if(sessionStorage.getItem('token')) {
       let token = JSON.parse(sessionStorage.getItem('token')!).token;
       const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
       this.http.post("http://localhost:3333/modificarUsuari", {user: usuari.user, email: usuari.correu, telefon: usuari.telefon, nom: usuari.nom, cognoms: usuari.cognoms },{headers}).subscribe();
     }
   })
  }
  cambiarContrasenya(contrasenya: string , token: string){
    return new Promise<void>(async (resolve, reject) => {
      const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
      this.http.post("http://localhost:3333/modificarContrasenya", {password: contrasenya}, {headers}).subscribe()
      resolve();
    })
  }

  solicitarCanviContrasenya(email: string){
    return new Promise<void>(async (resolve, reject) => {
      this.http.post("http://localhost:3333/solicitarCanvi", {email: email}).subscribe()
      resolve();
    })
  }
}
