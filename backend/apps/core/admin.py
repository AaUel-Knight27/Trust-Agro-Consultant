from django.contrib import admin
from .models import SiteStat, SiteConfig

@admin.register(SiteStat)
class SiteStatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'suffix', 'icon_name', 'order', 'is_active']
    list_editable = ['value', 'suffix', 'order', 'is_active']

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not SiteConfig.objects.exists()
    def has_delete_permission(self, request, obj=None):
        return False
