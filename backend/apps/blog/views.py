from rest_framework import viewsets

from .models import Post
from .serializers import PostDetailSerializer, PostListSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'

    def get_queryset(self):
        qs = Post.objects.filter(is_published=True).select_related(
            'content_type',
            'content_category',
        ).order_by('-published_at')
        content_type = self.request.query_params.get('content_type')
        if content_type:
            qs = qs.filter(content_type__slug=content_type)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(content_category__slug=category)
        return qs

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer
