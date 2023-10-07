from django.urls import path
from .views import ListaProductos, ListaCategorias, ListaSubCategorias


urlpatterns = [
    path('productos/', ListaProductos.as_view(), name='lista-productos'),
    path('categorias/', ListaCategorias.as_view(), name='lista-categorias'),
    path('subcategorias/', ListaSubCategorias.as_view(), name='lista-subcategorias'),
]