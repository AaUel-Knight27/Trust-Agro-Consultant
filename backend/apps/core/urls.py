from django.urls import path
from .views import SiteStatListView, SiteConfigView

urlpatterns = [
    path('stats/', SiteStatListView.as_view(), name='site-stats'),
    path('config/', SiteConfigView.as_view(), name='site-config'),
]
