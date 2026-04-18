from rest_framework import viewsets

from .models import Post
from .serializers import PostDetailSerializer, PostListSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'

    def get_queryset(self):
        qs = Post.objects.filter(is_published=True).order_by('-published_at')
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer
