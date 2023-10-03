import json
from typing import Any
from django.http import JsonResponse
from django.views import View
from .models import Producto
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from .serializers import ProductoSerializer

# Vista basada en una clase

class ListaProductos(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer