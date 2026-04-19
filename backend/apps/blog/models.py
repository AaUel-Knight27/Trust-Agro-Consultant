from django.db import models

from config.slug_utils import generate_unique_slug_from_title


class ContentType(models.Model):
    """
    Kind of post (e.g. Blog, News, Announcement).

    Not to be confused with ``django.contrib.contenttypes.models.ContentType``.
    """

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=128, unique=True, blank=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'content type'
        verbose_name_plural = 'content types'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug_from_title(
                self.name,
                ContentType,
                exclude_pk=self.pk,
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ContentCategory(models.Model):
    """Subject or domain label for a post (e.g. Animal Feed, Veterinary)."""

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=128, unique=True, blank=True)

    class Meta:
        ordering = ['name']
        db_table = 'blog_category'
        verbose_name = 'content category'
        verbose_name_plural = 'content categories'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug_from_title(
                self.name,
                ContentCategory,
                exclude_pk=self.pk,
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=128, unique=True, blank=True)
    cover_image = models.ImageField(upload_to='blog/covers/', blank=True, null=True)
    excerpt = models.TextField(max_length=300)
    body = models.TextField()
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.PROTECT,
        related_name='posts',
    )
    content_category = models.ForeignKey(
        ContentCategory,
        on_delete=models.PROTECT,
        related_name='posts',
        null=True,
        blank=True,
    )
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug_from_title(
                self.title,
                Post,
                exclude_pk=self.pk,
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
