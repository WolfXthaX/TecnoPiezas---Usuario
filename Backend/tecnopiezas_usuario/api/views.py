import json
from typing import Any
from django.http import JsonResponse
from django.views import View
from .models import Producto, Categoria, Subcategoria
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from .serializers import ProductoSerializer, CategoriaSerializer, SubcategoriaSerializer

# Vista basada en una clase

class ListaProductos(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ListaCategorias(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ListaSubCategorias(generics.ListAPIView):
    queryset = Subcategoria.objects.all()
    serializer_class = SubcategoriaSerializer