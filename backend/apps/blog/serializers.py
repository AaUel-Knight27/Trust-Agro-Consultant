from rest_framework import serializers

from .models import ContentCategory, ContentType, Post


class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = ['id', 'name', 'slug']


class ContentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentCategory
        fields = ['id', 'name', 'slug']


class PostListSerializer(serializers.ModelSerializer):
    content_type = ContentTypeSerializer(read_only=True)
    content_category = ContentCategorySerializer(read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'slug',
            'cover_image',
            'excerpt',
            'content_type',
            'content_category',
            'published_at',
        ]
        extra_kwargs = {'slug': {'read_only': True}}


class PostDetailSerializer(serializers.ModelSerializer):
    content_type = ContentTypeSerializer(read_only=True)
    content_category = ContentCategorySerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        extra_kwargs = {'slug': {'read_only': True}}
