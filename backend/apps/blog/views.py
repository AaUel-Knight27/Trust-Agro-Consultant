from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

from .models import Post
from .serializers import PostDetailSerializer, PostListSerializer

class PostFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='content_type__slug')

    class Meta:
        model = Post
        fields = ['category']

class PostViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = PostFilter
    search_fields = ['title', 'excerpt', 'body']

    def get_queryset(self):
        return Post.objects.filter(is_published=True).select_related(
            'content_type',
            'content_category',
        ).order_by('-published_at')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer

    @action(detail=True, methods=['get'], url_path='related')
    def related(self, request, slug=None):
        post = self.get_object()
        # Find related posts based on the same content type
        related = Post.objects.filter(
            is_published=True,
            content_type=post.content_type
        ).exclude(slug=post.slug).order_by('-published_at')[:3]
        
        serializer = PostListSerializer(related, many=True, context={'request': request})
        return Response(serializer.data)
