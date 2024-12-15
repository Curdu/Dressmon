import { Routes } from '@angular/router';
import {CatalegComponent} from './pagines/cataleg/cataleg.component';
import {CatalegProducteComponent} from './pagines/cataleg-producte/cataleg-producte.component';
import {CatelegCategoriaComponent} from './pagines/cateleg-categoria/cateleg-categoria.component';
import {CondidionsComponent} from './pagines/condidions/condidions.component';
import {ContacteComponent} from './pagines/contacte/contacte.component';
import {IniciSessioComponent} from './pagines/inici-sessio/inici-sessio.component';
import {RegistreComponent} from './pagines/registre/registre.component';
import {IniciComponent} from './pagines/inici/inici.component';

export const routes: Routes = [{ path: '',redirectTo: 'inici',  pathMatch: 'full' },
  {path: 'inici', component: IniciComponent},
  {path: 'cataleg', component: CatalegComponent},
  {path: 'cataleg/producte/:id', component: CatalegProducteComponent},
  {path: 'cataleg/categoria/:cat', component: CatelegCategoriaComponent},
  {path: 'condicions', component: CondidionsComponent},
  {path: 'contacte', component: ContacteComponent},
  {path: 'inicisessio', component: IniciSessioComponent},
  {path: 'registre', component: RegistreComponent},
];
