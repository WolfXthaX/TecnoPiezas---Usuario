import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../productos.service';
import { Subcategoria } from 'src/app/model/ClSubcategorias';

@Component({
  selector: 'app-filtro-productos',
  templateUrl: './filtro-productos.component.html',
  styleUrls: ['./filtro-productos.component.scss'],
})
export class FiltroProductosComponent implements OnInit {
  busqueda: string = '';
  categoria: number | '' = '';
  subcategoria: number | '' = '';
  categorias: any[] = [];
  subcategorias: Subcategoria[] = [];

  productosFiltrados: any[] = []; // Cambié el nombre de la variable a productosFiltrados

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });

    this.productosService.obtenerSubcategorias(1).subscribe((subcategorias) => {
      this.subcategorias = subcategorias;
    });

    this.productosService.obtenerSubcategorias(1).subscribe((subcategorias) => {
      this.subcategorias = subcategorias;
      // Aplica automáticamente los filtros al cargar la página
      this.aplicarFiltros();
    });
  }

  onCategoriaSeleccionada(): void {
    if (!this.categoria) {
      this.subcategoria = '';
      this.subcategorias = [];
      return;
    }

    this.productosService
      .obtenerSubcategoriasPorCategoria(Number(this.categoria))
      .subscribe(
        (subcategorias: Subcategoria[]) => {
          this.subcategorias = subcategorias;
          if (this.subcategorias.length > 0) {
            this.subcategoria = parseInt(this.subcategorias[0].subcategoria_id.toString());
          } else {
            this.subcategoria = '';
          }
        },
        (error) => {
          console.error('Error al obtener subcategorías:', error);
        }
      );
  }

  aplicarFiltros(): void {
    if (this.categoria !== '' && this.subcategoria !== '') {
      this.productosService
        .obtenerProductosFiltrados(this.busqueda, this.categoria, this.subcategoria)
        .subscribe((productos) => {
          // Asigna los productos filtrados a la variable local
          this.productosFiltrados = productos;
  
          // Actualiza los productos filtrados en el servicio
          this.productosService.actualizarProductosFiltrados(productos);
        });
    } else {
      // Si no se han seleccionado filtros, muestra todos los productos
      this.productosService
        .obtenerTodosLosProductos()
        .subscribe((productos) => {
          // Asigna los productos filtrados a la variable local
          this.productosFiltrados = productos;
  
          // Actualiza los productos filtrados en el servicio
          this.productosService.actualizarProductosFiltrados(productos);
        });
    }
  }
  
}
