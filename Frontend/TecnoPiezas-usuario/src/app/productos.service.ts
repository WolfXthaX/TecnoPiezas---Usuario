import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject ,Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

import { Subcategoria } from './model/ClSubcategorias';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api';

  // Con esto podremos conectar el filtro con el HTML de ver productos
  // debemos hacer esta conexion porque o si no, no funciona, porque?
  // no tengo ni idea, segun es porque estan en componetentes separados xd - Bayron A.

  private productosFiltradosSubject = new BehaviorSubject<any[]>([]);
  productosFiltrados$ = this.productosFiltradosSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerTodosLosProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/`);
  }

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias/`);
  }

  obtenerSubcategorias(categoriaId: number): Observable<Subcategoria[]> {
    const url = `http://localhost:8000/api/subcategorias_por_categoria/${categoriaId}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        // Realiza cualquier transformación necesaria en la respuesta
        // y mapea los datos al tipo Subcategoria[]
        return response as Subcategoria[];
      }),
      catchError((error: any) => {
        console.error('Error en la solicitud HTTP:', error);
        // Puedes manejar errores aquí según tus necesidades
        throw error;
      })
    );
  }

  obtenerSubcategoriasPorCategoria(categoriaId: number): Observable<Subcategoria[]> {
    const url = `http://localhost:8000/api/subcategorias_por_categoria/${categoriaId}`;
    
    return this.http.get(url).pipe(
      map((response: any) => {
        // Aquí puedes realizar cualquier transformación necesaria en la respuesta
        // Por ejemplo, si la respuesta tiene un formato diferente al tipo Subcategoria[],
        // puedes mapearla y transformarla en un array de subcategorías
        return response as Subcategoria[];
      })
    );
  }

  obtenerProductosFiltrados(busqueda: string, categoria: number | '', subcategoria: number | ''): Observable<any[]> {
    // Construye la URL para la solicitud HTTP con los parámetros de búsqueda
    let url = `${this.apiUrl}/productos/filtro/?`;
  
    if (busqueda) {
      url += `busqueda=${busqueda}&`;
    }
  
    if (categoria !== '') {
      url += `categoria=${categoria}&`;
    }
  
    if (subcategoria !== '') {
      url += `subcategoria=${subcategoria}&`;
    }
  
    // Remueve el último "&" si está presente
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }
  
    // Realiza la solicitud HTTP para obtener productos filtrados
    return this.http.get<any[]>(url);
  }

  actualizarProductosFiltrados(productos: any[]): void {
    this.productosFiltradosSubject.next(productos);
  }

}
