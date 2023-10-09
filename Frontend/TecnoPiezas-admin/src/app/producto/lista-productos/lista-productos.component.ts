import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { ProductoModule } from '../producto.module';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
})
export class ListaProductosComponent  implements OnInit {

  navigateToEditar(productoId: number) {
    this.navCtrl.navigateForward(`productos/editar/${productoId}`);
  }

  productos: any[] = [];

  constructor(private adminService: AdminService,
              private navCtrl: NavController) { }

  ngOnInit() {

    this.adminService.getProductos().subscribe(
      (data: any) => {
        console.log('Datos de productos recibidos:', data);
        this.productos = data;
      },
      (error: any) => {
        console.error('Error al obtener los productos:', error);
      }
    );

  }

  eliminarProducto(productoId: number) {
    this.adminService.eliminarProducto(productoId).subscribe(
      () => {
        // Producto eliminado exitosamente, actualiza la lista de productos
        console.log('Producto eliminado exitosamente');
        // Luego de eliminar con éxito, actualiza la lista de productos llamando a tu servicio para obtener la lista actualizada.
        this.adminService.getProductos().subscribe(
          (productos) => {
            // Actualiza la lista de productos en tu componente
            this.productos = productos;
          },
          (error) => {
            console.error('Error al obtener la lista de productos', error);
          }
        );
      },
      (error) => {
        // Maneja cualquier error que pueda ocurrir durante la eliminación
        console.error('Error al eliminar el producto', error);
      }
    );
  }

}
