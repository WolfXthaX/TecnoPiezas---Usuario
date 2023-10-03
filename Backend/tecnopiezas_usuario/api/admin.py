from django.contrib import admin
from .models import Producto, Categoria, Subcategoria

# Register your models here.

admin.site.register(Producto)
admin.site.register(Subcategoria)
admin.site.register(Categoria)
