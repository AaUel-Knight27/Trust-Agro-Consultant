from django.contrib import admin
from django.utils.html import format_html

from .models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'name', 'role', 'order', 'is_active']
    list_display_links = ['name']
    list_editable = ['order', 'is_active']
    search_fields = ['name', 'role']

    def image_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 50%;" />', obj.photo.url)
        return "-"
    image_preview.short_description = 'Photo'
