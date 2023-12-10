from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.urls import reverse
from applications.models import Application, Message
from applications.serializers.application_serializer import MessageCreateSerializer, MessageListSerializer
from applications.permissions import IsRelatedToApplication
from notifications.models import Notification
from django.shortcuts import get_object_or_404
from applications.serializers.application_serializer import MessagePageNumberPagination


class MessageCreateAPIView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageCreateSerializer
    permission_classes = [IsAuthenticated, IsRelatedToApplication]

    def perform_create(self, serializer):
        application_id = self.kwargs.get('pk')
        application = get_object_or_404(Application, id=application_id)

        if self.request.user == application.pet_seeker or self.request.user == application.pet_shelter:
            message = serializer.save(
                application=application, sender=self.request.user)

            receiver = application.pet_shelter if self.request.user == application.pet_seeker else application.pet_seeker

            # Truncate the message content to a certain length for the notification
            truncated_message = (message.content[:50] + '...') if len(message.content) > 50 else message.content

            # Create a notification for the receiver
            message_list_url = reverse(
                'applications:message-list', kwargs={'pk': application_id})
            Notification.objects.create(
                user=receiver,
                message=f"New message from {self.request.user.username}: '{truncated_message}'",
                related_link=message_list_url
            )
        else:
            raise serializers.ValidationError(
                "You are not authorized to send a message for this application.")


class MessageListAPIView(ListAPIView):
    pagination_class = MessagePageNumberPagination
    serializer_class = MessageListSerializer
    permission_classes = [IsAuthenticated, IsRelatedToApplication]

    def get_queryset(self):
        application_id = self.kwargs.get('pk')
        return Message.objects.filter(application_id=application_id).order_by('-timestamp')
