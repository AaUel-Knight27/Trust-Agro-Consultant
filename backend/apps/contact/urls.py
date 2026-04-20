from django.urls import path

from .views import ContactSubmissionView, ConsultationBookingView

urlpatterns = [
    path('', ContactSubmissionView.as_view(), name='contact-submit'),
    path('book/', ConsultationBookingView.as_view(), name='consultation-book'),
]
