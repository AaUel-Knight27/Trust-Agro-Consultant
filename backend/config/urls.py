from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'ok', 'service': 'Trust Agro API'})

urlpatterns = [
    path('', health_check),
    path('health/', health_check),
    path('admin/', admin.site.urls),
    path('api/blog/', include('apps.blog.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/team/', include('apps.team.urls')),
    path('api/contact/', include('apps.contact.urls')),
]
