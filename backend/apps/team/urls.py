from rest_framework.routers import DefaultRouter

from .views import TeamMemberViewSet

router = DefaultRouter()
router.register(r'', TeamMemberViewSet, basename='team-member')

urlpatterns = router.urls
