from rest_framework import serializers
from accounts.models import PetUser
from .models import ShelterComment, Reply
from django.utils.timesince import timesince
from django.utils import timezone
import datetime

# Temp pet user serializer, need to be imported from accounts later
class PetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['id', 'username']



class ReplySerializer(serializers.ModelSerializer):
    user = PetUserSerializer(read_only=True)
    time_since_posted = serializers.SerializerMethodField()
    class Meta:
        model = Reply
        fields = ['id', 'text', 'user', 'create_time', 'time_since_posted']
    def get_time_since_posted(self, obj):
        """
        Returns a human-readable representation of the time difference between
        now and when the comment was posted.
        """
        now = timezone.now()
        if obj.create_time > now - datetime.timedelta(days=1):
            # If the comment was created less than a day ago, show hours/minutes
            return timesince(obj.create_time).split(",")[0] + " ago"
        else:
            # If the comment is older, show the date
            return obj.create_time.strftime("%Y-%m-%d")

# Shelter Comment
class ShelterCommentSerializer(serializers.ModelSerializer):
    num_replies = serializers.SerializerMethodField()
    user = PetUserSerializer(read_only=True)
    time_since_posted = serializers.SerializerMethodField()
    replies = ReplySerializer(many=True, read_only=True)

    def get_num_replies(self, topic):
        return topic.replies.all().count()

    def get_time_since_posted(self, obj):
        """
        Returns a human-readable representation of the time difference between
        now and when the comment was posted.
        """
        now = timezone.now()
        if obj.create_time > now - datetime.timedelta(days=1):
            # If the comment was created less than a day ago, show hours/minutes
            return timesince(obj.create_time).split(",")[0] + " ago"
        else:
            # If the comment is older, show the date
            return obj.create_time.strftime("%Y-%m-%d")

    class Meta:
        model = ShelterComment
        fields = '__all__'
        read_only_fields = ['create_time']
        
class ShelterReplySerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    user = PetUserSerializer(read_only=True)
    time_since_posted = serializers.SerializerMethodField()

    class Meta:
        model = ShelterComment
        fields = '__all__'
        # depth = 1  # This ensures that User objects are nested
    def get_time_since_posted(self, obj):
        """
        Returns a human-readable representation of the time difference between
        now and when the comment was posted.
        """
        now = timezone.now()
        if obj.create_time > now - datetime.timedelta(days=1):
            # If the comment was created less than a day ago, show hours/minutes
            return timesince(obj.create_time).split(",")[0] + " ago"
        else:
            # If the comment is older, show the date
            return obj.create_time.strftime("%Y-%m-%d")