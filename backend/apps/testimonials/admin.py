from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'role', 'rating', 'is_featured', 'is_active', 'order']
    list_editable = ['is_featured', 'is_active', 'order']
    list_filter = ['is_featured', 'is_active', 'rating']
    search_fields = ['full_name', 'organization', 'message']
