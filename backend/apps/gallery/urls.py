from django.urls import path
from .views import GalleryImageListView, GalleryCategoryListView

urlpatterns = [
    path('', GalleryImageListView.as_view(), name='gallery-list'),
    path('categories/', GalleryCategoryListView.as_view(), name='gallery-categories'),
]
