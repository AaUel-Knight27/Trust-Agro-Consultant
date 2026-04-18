from django.contrib import admin

from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'subject', 'submitted_at', 'is_read']
    list_filter = ['is_read']
    search_fields = ['full_name', 'email', 'subject']
    list_editable = ['is_read']
    readonly_fields = [
        'full_name',
        'email',
        'phone',
        'subject',
        'message',
        'submitted_at',
    ]
    actions = ['mark_as_read']

    @admin.action(description='Mark selected submissions as read')
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
