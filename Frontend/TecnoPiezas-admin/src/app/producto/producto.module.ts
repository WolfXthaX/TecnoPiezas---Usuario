import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';

import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ListaProductosComponent,
    EditarProductoComponent,
    CrearProductoComponent,
    DetallesProductoComponent
  ],
  imports: [
    CommonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class ProductoModule { }
