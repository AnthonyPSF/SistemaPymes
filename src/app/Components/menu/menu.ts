import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  terminoBusqueda: string = '';
constructor(private router: Router) {}

  onBuscar() {
    // Evitamos búsquedas vacías
    if (this.terminoBusqueda.trim().length === 0) {
      return;
    }

    console.log('Buscando:', this.terminoBusqueda);

    // OPCIÓN A: Navegar a una ruta de resultados
    // Equivalente a action="/ruta-de-busqueda"
    this.router.navigate(['/ruta-de-busqueda'], { queryParams: { q: this.terminoBusqueda } });

    // OPCIÓN B: Si la búsqueda es en la misma página, aquí llamarías a tu servicio
    // this.miServicio.buscar(this.terminoBusqueda)...
  }
}
