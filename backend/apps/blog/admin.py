from django.contrib import admin

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
    fields = [
        'title',
        'content_type',
        'content_category',
        'excerpt',
        'body',
        'cover_image',
        'is_published',
    ]
    list_display = [
        'title',
        'slug',
        'content_type',
        'content_category',
        'is_published',
        'published_at',
    ]
    list_filter = ['content_type', 'content_category', 'is_published']
    search_fields = ['title', 'excerpt']
    list_editable = ['is_published']
