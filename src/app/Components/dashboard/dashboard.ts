import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  count: number = 30; // Número de cajas a generar
  boxes: number[] = [];


  // Creamos un array para iterar en el template
    ngOnInit(): void {
    this.updateBoxes();
  }
   updateBoxes() {
    this.boxes = Array.from({ length: this.count }, (_, i) => i);
  }

}
