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
        extra_kwargs = {'slug': {'read_only': True}}


class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        extra_kwargs = {'slug': {'read_only': True}}
