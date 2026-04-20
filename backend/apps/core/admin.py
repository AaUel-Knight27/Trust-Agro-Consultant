from django.contrib import admin
from .models import SiteStat, SiteConfig

@admin.register(SiteStat)
class SiteStatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'suffix', 'icon_name', 'order', 'is_active']
    list_editable = ['value', 'suffix', 'order', 'is_active']

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Company Info', {
            'fields': ('company_name', 'tagline', 'description')
        }),
        ('Contact Details', {
            'fields': ('email', 'phone', 'address', 'office_hours')
        }),
        ('Social Media', {
            'fields': ('facebook_url', 'instagram_url', 'whatsapp_number')
        }),
        ('Visuals', {
            'fields': ('logo', 'favicon')
        }),
    )

    def has_add_permission(self, request):
        return not SiteConfig.objects.exists()
    def has_delete_permission(self, request, obj=None):
        return False
