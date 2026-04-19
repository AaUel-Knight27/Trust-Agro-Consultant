from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/blog/', include('apps.blog.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/team/', include('apps.team.urls')),
    path('api/contact/', include('apps.contact.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
