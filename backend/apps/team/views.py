from rest_framework import viewsets

from .models import TeamMember
from .serializers import TeamMemberSerializer


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        return TeamMember.objects.filter(is_active=True).order_by('order', 'id')
