from rest_framework.generics import ListAPIView
from .models import Testimonial
from .serializers import TestimonialSerializer

class TestimonialListView(ListAPIView):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        featured_only = self.request.query_params.get('featured', None)
        qs = Testimonial.objects.filter(is_active=True)
        if featured_only == 'true':
            qs = qs.filter(is_featured=True)
        return qs
