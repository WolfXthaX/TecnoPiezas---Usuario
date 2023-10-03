from django.urls import path
from .views import ListaProductos


urlpatterns = [
    path('productos/', ListaProductos.as_view(), name='lista-productos'),
]