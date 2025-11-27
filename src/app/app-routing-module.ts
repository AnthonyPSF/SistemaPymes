import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Menu } from './Components/menu/menu';
import { Dashboard } from './Components/dashboard/dashboard';


const routes: Routes = [
 { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  
  
    
  // ruta comodín para no encontrados
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
