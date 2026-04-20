from django.contrib import admin
from django.utils.html import format_html

from config.admin_mixins import AutoSlugAdminMixin

from .models import ContentCategory, ContentType, Post


@admin.register(ContentType)
class ContentTypeAdmin(AutoSlugAdminMixin, admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']


@admin.register(ContentCategory)
class ContentCategoryAdmin(AutoSlugAdminMixin, admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']


@admin.register(Post)
class PostAdmin(AutoSlugAdminMixin, admin.ModelAdmin):
    fieldsets = (
        ('Content', {
            'fields': ('title', 'content_type', 'content_category', 'excerpt', 'body')
        }),
        ('Media', {
            'fields': ('cover_image',)
        }),
        ('Status', {
            'fields': ('is_published',)
        }),
    )
    list_display = [
        'image_preview',
        'title',
        'content_type',
        'content_category',
        'is_published',
        'published_at',
    ]
    list_display_links = ['title']
    list_filter = ['content_type', 'content_category', 'is_published']
    search_fields = ['title', 'excerpt']
    list_editable = ['is_published']

    def image_preview(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />', obj.cover_image.url)
        return "-"
    image_preview.short_description = 'Preview'
