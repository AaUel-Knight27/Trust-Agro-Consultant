# Taxonomy refactor: ContentType + ContentCategory; migrate legacy Post.category values.

import django.db.models.deletion
from django.db import migrations, models


def forwards_migrate_legacy_category(apps, schema_editor):
    Post = apps.get_model('blog', 'Post')
    ContentType = apps.get_model('blog', 'ContentType')
    seed = [
        ('News', 'news'),
        ('Blog', 'blog'),
        ('Announcement', 'announcement'),
    ]
    for name, slug in seed:
        ContentType.objects.get_or_create(slug=slug, defaults={'name': name})
    for post in Post.objects.all():
        key = getattr(post, 'category', None) or 'blog'
        if key not in ('news', 'blog', 'announcement'):
            key = 'blog'
        ct = ContentType.objects.get(slug=key)
        post.content_type_id = ct.pk
        post.save(update_fields=['content_type_id'])


def backwards_restore_category_field(apps, schema_editor):
    Post = apps.get_model('blog', 'Post')
    ContentType = apps.get_model('blog', 'ContentType')
    for post in Post.objects.all():
        if post.content_type_id:
            ct = ContentType.objects.get(pk=post.content_type_id)
            post.category = ct.slug
            post.save(update_fields=['category'])


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(blank=True, max_length=128, unique=True)),
            ],
            options={
                'verbose_name': 'content type',
                'verbose_name_plural': 'content types',
                'ordering': ['name'],
            },
        ),
        migrations.RenameModel(
            old_name='Category',
            new_name='ContentCategory',
        ),
        migrations.AlterModelTable(
            name='ContentCategory',
            table='blog_category',
        ),
        migrations.AlterField(
            model_name='contentcategory',
            name='slug',
            field=models.SlugField(blank=True, max_length=128, unique=True),
        ),
        migrations.AddField(
            model_name='post',
            name='content_category',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name='posts',
                to='blog.contentcategory',
            ),
        ),
        migrations.AddField(
            model_name='post',
            name='content_type',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name='posts',
                to='blog.contenttype',
            ),
        ),
        migrations.RunPython(forwards_migrate_legacy_category, backwards_restore_category_field),
        migrations.RemoveField(
            model_name='post',
            name='category',
        ),
        migrations.AlterField(
            model_name='post',
            name='content_type',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='posts',
                to='blog.contenttype',
            ),
        ),
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(blank=True, max_length=128, unique=True),
        ),
    ]
