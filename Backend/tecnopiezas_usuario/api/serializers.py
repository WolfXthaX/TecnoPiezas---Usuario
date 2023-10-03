from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_imagen(self, obj):
        # Construye la URL completa de la imagen
        return self.context['request'].build_absolute_uri(obj.imagen.url)
