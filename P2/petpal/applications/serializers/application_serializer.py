from rest_framework import serializers
from applications.models import Application, Message
from django.db import models
from rest_framework.pagination import PageNumberPagination


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'content', 'timestamp']


class ApplicationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'pet_seeker', 'pet_shelter',
                  'pet_listing', 'status', 'messages', 'created_at', 'updated_at',]
        read_only_fields = ['status']


class CreateApplicationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        exclude = ('pet_listing', 'pet_name', 'status',
                   'pet_seeker', 'pet_shelter',)


class SeekerUpdateApplicationSerializer(serializers.ModelSerializer):
    PENDING = 'pending'
    WITHDRAWN = 'withdrawn'

    STATUS_CHOICES = [
        (PENDING, 'pending'),
        (WITHDRAWN, 'withdrawn'),
    ]

    status = serializers.ChoiceField(
        choices=STATUS_CHOICES,
        default=PENDING,
        required=False,
    )

    class Meta:
        model = Application
        fields = '__all__'

    def get_read_only_fields(self, validated_data):
        all_fields = set(super().get_read_only_fields(validated_data))
        read_only_fields = all_fields.copy()
        read_only_fields.discard('status')
        return read_only_fields


class ShelterUpdateApplicationSerializer(serializers.ModelSerializer):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DENIED = 'denied'

    STATUS_CHOICES = [
        (PENDING, 'pending'),
        (ACCEPTED, 'accepted'),
        (DENIED, 'denied'),
    ]

    status = serializers.ChoiceField(
        choices=STATUS_CHOICES,
        required=False,
    )

    class Meta:
        model = Application
        fields = '__all__'

    def get_read_only_fields(self, validated_data):
        all_fields = set(super().get_read_only_fields(validated_data))
        read_only_fields = all_fields.copy()
        read_only_fields.discard('status')
        return read_only_fields


class ApplicationListSerializer(serializers.ModelSerializer):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DENIED = 'denied'
    WITHDRAWN = 'withdrawn'
    STATUS_CHOICES = [
        (PENDING, 'pending'),
        (ACCEPTED, 'accepted'),
        (DENIED, 'denied'),
        (WITHDRAWN, 'withdrawn'),
    ]

    status = serializers.ChoiceField(
        choices=STATUS_CHOICES,
        required=False,
        help_text="Filter by status",
        default=PENDING
    )
    sort_by_creation_time = serializers.BooleanField(
        required=False,
        help_text="Sort by creation time",
    )
    sort_by_last_update_time = serializers.BooleanField(
        required=False,
        help_text="Sort by last update time",
    )

    class Meta:
        model = Application
        fields = '__all__'


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10  # You can adjust the number of items per page as needed
    page_size_query_param = 'page_size'
    max_page_size = 100


class GetApplicationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
