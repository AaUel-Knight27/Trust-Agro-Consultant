from django.db import models

class Testimonial(models.Model):
    full_name = models.CharField(max_length=150)
    role = models.CharField(max_length=150, blank=True,
                            help_text="e.g. Dairy Farmer, Bishoftu")
    organization = models.CharField(max_length=150, blank=True)
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    message = models.TextField(help_text="The testimonial text (2-4 sentences ideal)")
    rating = models.PositiveSmallIntegerField(
        default=5,
        choices=[(i, i) for i in range(1, 6)]
    )
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.full_name} — {self.role}"
