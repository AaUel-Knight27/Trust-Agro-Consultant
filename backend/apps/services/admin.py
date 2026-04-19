from django.contrib import admin

from config.admin_mixins import AutoSlugAdminMixin

from .models import Service


@admin.register(Service)
class ServiceAdmin(AutoSlugAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'slug', 'order', 'is_active']
    list_editable = ['order', 'is_active']
