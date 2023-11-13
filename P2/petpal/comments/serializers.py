from rest_framework import serializers
from accounts.models import PetUser
from .models import ApplicationComment, ShelterComment, Reply

# Temp pet user serializer, need to be imported from accounts later
class PetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['id', 'username']
# Application Comment
class ApplicationCommentSerializer(serializers.ModelSerializer):
    user = PetUserSerializer(read_only=True)

    class Meta:
        model = ApplicationComment
        fields = '__all__'
        read_only_fields = ['create_time']
        extra_kwargs = {'text': {'write_only': True}}

# Shelter Comment
class ShelterCommentSerializer(serializers.ModelSerializer):
    num_replies = serializers.SerializerMethodField()
    user = PetUserSerializer(read_only=True)

    def get_num_replies(self, topic):
        return topic.replies.all().count()

    class Meta:
        model = ShelterComment
        fields = '__all__'
        read_only_fields = ['create_time']
        extra_kwargs = {'text': {'write_only': True}}

class ReplySerializer(serializers.ModelSerializer):
    user = PetUserSerializer(read_only=True)
    class Meta:
        model = Reply
        fields = ['id', 'text', 'user', 'create_time']

class ShelterReplySerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    user = PetUserSerializer(read_only=True)

    class Meta:
        model = ShelterComment
        fields = '__all__'
        # depth = 1  # This ensures that User objects are nested