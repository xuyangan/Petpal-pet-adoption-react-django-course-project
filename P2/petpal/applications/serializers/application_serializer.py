from rest_framework import serializers
from applications.models import Application, Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'content', 'timestamp']

class ApplicationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'pet_seeker', 'pet_shelter', 'pet_listing', 'status', 'messages']
        read_only_fields = ['status'] 