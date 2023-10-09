import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Método para obtener una lista de todos los productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/`);
  }

  // Método para obtener detalles de un producto específico por su ID
  getProducto(producto_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${producto_id}/`);
  }

  // Método para crear un nuevo producto
  crearProducto(productoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos/`, productoData);
  }

  // Método para actualizar un producto existente por su ID
  actualizarProducto(producto_id: number, productoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${producto_id}/`, productoData);
  }

  // Método para eliminar un producto por su ID
  eliminarProducto(producto_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${producto_id}`);
  }

  // Metodo para obtener las categorias
  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/`);
  }

  // Metodo para obtener las subcategorias por su categoria
  getSubcategoriasPorCategoria(categoriaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subcategorias_por_categoria/${categoriaId}`);
  }

}
