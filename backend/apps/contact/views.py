from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import ContactSubmissionSerializer


class ContactSubmissionView(CreateAPIView):
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'message': (
                    'Your message has been received. We will get back to you shortly.'
                ),
            },
            status=201,
        )
