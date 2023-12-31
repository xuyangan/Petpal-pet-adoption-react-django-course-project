from rest_framework import serializers
from accounts.models import PetUser
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'is_read', 'created_at', 'related_link']
        read_only_fields = ['id', 'message', 'created_at', 'related_link']  # Ensure these fields are read-only
