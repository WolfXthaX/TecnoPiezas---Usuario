import { Component, OnInit } from '@angular/core';

import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-filtro-productos',
  templateUrl: './filtro-productos.component.html',
  styleUrls: ['./filtro-productos.component.scss'],
})
export class FiltroProductosComponent  implements OnInit {

  busqueda: string = '';
  categoria: number | '' = '';
  subcategoria: number | '' = '';
  categorias: any[] = [];
  subcategorias: any[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit() {

    // Llama al servicio para obtener categorías y subcategorías
    this.productosService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });

    this.productosService.obtenerSubcategorias().subscribe((subcategorias) => {
      this.subcategorias = subcategorias;
    });

  }

}
