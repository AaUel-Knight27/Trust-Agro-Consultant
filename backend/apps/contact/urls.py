from django.urls import path

from .views import ContactSubmissionView

urlpatterns = [
    path('', ContactSubmissionView.as_view(), name='contact-submit'),
]
