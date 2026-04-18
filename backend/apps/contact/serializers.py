from rest_framework import serializers

from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['full_name', 'email', 'phone', 'subject', 'message']
