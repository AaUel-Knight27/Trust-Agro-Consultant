from rest_framework import serializers
from .models import GalleryImage, GalleryCategory

class GalleryCategorySerializer(serializers.ModelSerializer):
    image_count = serializers.SerializerMethodField()

    class Meta:
        model = GalleryCategory
        fields = ['id', 'name', 'slug', 'image_count']

    def get_image_count(self, obj):
        return obj.images.filter(is_active=True).count()

class GalleryImageSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'description', 'image',
                  'category_name', 'category_slug', 'order']
