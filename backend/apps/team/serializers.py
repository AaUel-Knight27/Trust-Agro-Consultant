from rest_framework import serializers

from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = [
            'id',
            'name',
            'role',
            'photo',
            'facebook_url',
            'linkedin_url',
            'email',
            'phone',
            'experience_short',
            'order',
        ]
