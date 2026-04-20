from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteStat, SiteConfig
from .serializers import SiteStatSerializer, SiteConfigSerializer

class SiteStatListView(ListAPIView):
    queryset = SiteStat.objects.filter(is_active=True)
    serializer_class = SiteStatSerializer

class SiteConfigView(APIView):
    def get(self, request):
        config = SiteConfig.get()
        return Response(SiteConfigSerializer(config).data)
