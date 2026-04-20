from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'full_name', 'role', 'organization',
                  'photo', 'message', 'rating', 'order']
