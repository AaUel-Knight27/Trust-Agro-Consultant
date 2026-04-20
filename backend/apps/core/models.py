from django.db import models

class SiteStat(models.Model):
    label = models.CharField(max_length=100, help_text="e.g. Trained Farmers")
    value = models.CharField(max_length=20, help_text="e.g. 500+ or 3")
    suffix = models.CharField(max_length=10, default='+', blank=True,
                              help_text="Suffix shown after number e.g. + or empty")
    icon_name = models.CharField(max_length=100, help_text="Lucide icon name e.g. Users")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.value}{self.suffix} {self.label}"


class SiteConfig(models.Model):
    """Singleton model for global site settings."""
    phone = models.CharField(max_length=30, default='+251 919 076 607')
    email = models.EmailField(default='info@trustagroconsult.com')
    address = models.CharField(max_length=200, default='Addis Ababa, Ethiopia')
    whatsapp_number = models.CharField(max_length=20, default='251919076607')
    booking_url = models.URLField(default='https://trustagroconsult.com/book-consulting')
    founded_year = models.PositiveIntegerField(default=2021)

    class Meta:
        verbose_name = 'Site Configuration'
        verbose_name_plural = 'Site Configuration'

    def __str__(self):
        return 'Site Configuration'

    def save(self, *args, **kwargs):
        # Singleton: only one SiteConfig record allowed
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
