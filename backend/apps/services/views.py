from rest_framework import viewsets

from .models import Service
from .serializers import ServiceDetailSerializer, ServiceListSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'

    def get_queryset(self):
        return Service.objects.filter(is_active=True).order_by('order')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceListSerializer
