from django.db import models

from config.slug_utils import generate_unique_slug_from_title


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=128, unique=True, blank=True)
    short_description = models.CharField(max_length=250)
    full_description = models.TextField()
    icon_name = models.CharField(
        max_length=100,
        help_text='Lucide icon name e.g. Stethoscope, BookOpen',
    )
    cover_image = models.ImageField(upload_to='services/covers/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug_from_title(
                self.title,
                Service,
                exclude_pk=self.pk,
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
