from rest_framework import serializers

from .models import ContactSubmission, ConsultationBooking


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['full_name', 'email', 'phone', 'subject', 'message']


class ConsultationBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationBooking
        fields = [
            'full_name', 'email', 'phone', 'service_type',
            'farm_size', 'preferred_date', 'preferred_time',
            'location', 'notes'
        ]
