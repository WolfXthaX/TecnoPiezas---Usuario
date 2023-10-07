import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) {}

  obtenerTodosLosProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/`);
  }

  aplicarFiltros(): void {
    // Implementa la lógica para aplicar los filtros y actualizar la lista de productos
    // Llama al servicio para obtener productos filtrados
    this.productosService.obtenerProductosFiltrados(this.busqueda, this.categoria, this.subcategoria)
      .subscribe((productos) => {
        // Actualiza la lista de productos en la vista principal
        // Puedes emitir un evento para que el componente principal actualice la lista
      });
  }

}
