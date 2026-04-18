from rest_framework import serializers

from .models import Service


class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id',
            'title',
            'slug',
            'short_description',
            'icon_name',
            'cover_image',
            'order',
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
