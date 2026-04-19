from django.core.validators import MaxLengthValidator
from django.db import models


class TeamMember(models.Model):
    """Expert / team member shown on the public site."""

    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='team/photos/', blank=True, null=True)
    facebook_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    experience_short = models.CharField(
        max_length=40,
        blank=True,
        default='',
        help_text='Short line shown when visitors hover the photo (max 40 characters).',
        validators=[MaxLengthValidator(40)],
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'team member'
        verbose_name_plural = 'team members'

    def __str__(self):
        return self.name
