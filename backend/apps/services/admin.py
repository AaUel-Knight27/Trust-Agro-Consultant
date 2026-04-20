from django.contrib import admin
from django.utils.html import format_html

from config.admin_mixins import AutoSlugAdminMixin

from .models import Service


@admin.register(Service)
class ServiceAdmin(AutoSlugAdminMixin, admin.ModelAdmin):
    fieldsets = (
        ('General Information', {
            'fields': ('title', 'icon_name', 'short_description', 'full_description')
        }),
        ('Media', {
            'fields': ('cover_image',)
        }),
        ('Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    list_display = ['image_preview', 'title', 'order', 'is_active']
    list_display_links = ['title']
    list_editable = ['order', 'is_active']
    search_fields = ['title', 'short_description']

    def image_preview(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />', obj.cover_image.url)
        return "-"
    image_preview.short_description = 'Preview'
