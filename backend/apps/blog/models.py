from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    CATEGORY_CHOICES = [
        ('news', 'News'),
        ('blog', 'Blog'),
        ('announcement', 'Announcement'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    cover_image = models.ImageField(upload_to='blog/covers/', blank=True, null=True)
    excerpt = models.TextField(max_length=300)
    body = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='blog')
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify

            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
