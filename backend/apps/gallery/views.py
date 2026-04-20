from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import GalleryImage, GalleryCategory
from .serializers import GalleryImageSerializer, GalleryCategorySerializer

class GalleryCategoryListView(ListAPIView):
    queryset = GalleryCategory.objects.all()
    serializer_class = GalleryCategorySerializer

class GalleryImageListView(ListAPIView):
    serializer_class = GalleryImageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__slug']

    def get_queryset(self):
        return GalleryImage.objects.filter(is_active=True)
