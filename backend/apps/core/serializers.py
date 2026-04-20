from rest_framework import serializers
from .models import SiteStat, SiteConfig

class SiteStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteStat
        fields = ['id', 'label', 'value', 'suffix', 'icon_name', 'order']

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = ['phone', 'email', 'address', 'whatsapp_number',
                  'booking_url', 'founded_year']
