import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductoModule } from '../producto.module';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
})
export class EditarProductoComponent implements OnInit {
  producto: any = {};

  productoForm: FormGroup;

  categorias: any[] = [];
  subcategorias: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productoForm = this.formBuilder.group({
      imagen: [null], // Puedes configurar esto para la carga de imágenes si es necesario
      nombre: ['', Validators.required],
      precio: [0, Validators.min(0)],
      stock: [0, Validators.min(0)],
      descripcion: [''],
      categoria: [null, Validators.required],
      subcategoria: [null, Validators.required],
    });
  }

  ngOnInit() {
    const productoId = this.route.snapshot.params['id'];
    this.adminService.getProducto(productoId).subscribe(
      (data: any) => {
        console.log('Datos del producto a editar:', data);
        // this.producto = data;

        // Utiliza patchValue para asignar valores al formulario
        this.productoForm.patchValue(data); // Esto soluciona el error TS2531
      },
      (error: any) => {
        console.error('Error al obtener el producto:', error);
      }
    );

    this.adminService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Almacena el archivo seleccionado en el formulario
      this.productoForm.get('imagen')?.setValue(file);
    }
  }

  guardarCambios() {
    // Obtén el ID del producto del formulario
    const productoId = this.productoForm.get('producto_id')?.value; // Usando verificación de nulidad segura
    this.adminService.actualizarProducto(productoId, this.productoForm.value).subscribe(
      (data: any) => {
        console.log('Producto actualizado:', data);
        
        this.router.navigate(['productos']);

      },
      (error: any) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  cargarSubcategorias() {
    const categoriaId = this.productoForm.get('categoria')?.value; // Usando verificación de nulidad segura
    if (categoriaId) {
      this.adminService.getSubcategoriasPorCategoria(categoriaId).subscribe((data) => {
        this.subcategorias = data;
      });
    } else {
      // Limpiar la lista de subcategorías si no se ha seleccionado una categoría
      this.subcategorias = [];
    }
  }
}
