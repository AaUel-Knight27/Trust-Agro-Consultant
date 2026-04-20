from django.db import models


class ContactSubmission(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f'{self.full_name} - {self.subject}'


class ConsultationBooking(models.Model):
    SERVICE_CHOICES = [
        ('consulting', 'Consulting Services'),
        ('training', 'Training Service'),
        ('veterinary', 'Veterinary Medical Service'),
        ('animal_feed', 'Animal Feed'),
        ('farm_products', 'Sale of Farm Products'),
        ('equipment', 'Animal Husbandry Equipment'),
        ('general', 'General Inquiry'),
    ]

    PREFERRED_TIME_CHOICES = [
        ('morning', 'Morning (8am - 12pm)'),
        ('afternoon', 'Afternoon (12pm - 5pm)'),
        ('any', 'Any Time'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    service_type = models.CharField(max_length=50, choices=SERVICE_CHOICES, default='general')
    farm_size = models.CharField(
        max_length=50,
        blank=True,
        choices=[
            ('small', 'Small (under 1 hectare)'),
            ('medium', 'Medium (1-10 hectares)'),
            ('large', 'Large (10+ hectares)'),
            ('commercial', 'Commercial Farm'),
        ]
    )
    preferred_date = models.DateField()
    preferred_time = models.CharField(max_length=20, choices=PREFERRED_TIME_CHOICES, default='any')
    location = models.CharField(max_length=200, help_text="City or region in Ethiopia")
    notes = models.TextField(blank=True, help_text="Any additional details")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.full_name} — {self.get_service_type_display()} ({self.preferred_date})"
