from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import ContactSubmissionSerializer, ConsultationBookingSerializer
from .email_utils import send_contact_notification


class ContactSubmissionView(CreateAPIView):
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()

        # Send email notification (non-blocking, errors are caught internally)
        send_contact_notification(submission)

        return Response(
            {
                'message': (
                    'Your message has been received. We will get back to you shortly.'
                ),
            },
            status=201,
        )


class ConsultationBookingView(CreateAPIView):
    serializer_class = ConsultationBookingSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()
        # Optionally: send email notification here too
        return Response(
            {
                'message': 'Your consultation request has been received. We will confirm your appointment within 24 hours.',
                'booking_date': str(booking.preferred_date),
            },
            status=201
        )
