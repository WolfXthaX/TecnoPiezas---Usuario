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

}
