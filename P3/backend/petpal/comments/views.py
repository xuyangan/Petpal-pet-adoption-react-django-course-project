from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, \
    CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ShelterCommentSerializer, ReplySerializer, \
    ShelterReplySerializer
from .models import ShelterComment
from django.shortcuts import get_object_or_404
from .models import ShelterComment, PetUser
from .serializers import ShelterCommentSerializer
from notifications.models import Notification
from django.urls import reverse

# Create your views here.
class ShelterCommentListCreate(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        shelter_name = self.kwargs.get('shelter_name')
        shelter = get_object_or_404(PetUser, shelter_name=shelter_name)
        return ShelterComment.objects.filter(shelter=shelter).order_by('-create_time')
    
    def perform_create(self, serializer):
        shelter_name = self.kwargs.get('shelter_name')
        shelter = get_object_or_404(PetUser, shelter_name=shelter_name)
        comment = serializer.save(user=self.request.user, shelter=shelter)

        if shelter != self.request.user:
                comment_url = reverse('comments:shelter_comment_retrieve', args=[shelter_name, comment.id])
                reply_text = comment.text[:10] + '...' if len(comment.text) > 10 else comment.text
                Notification.objects.create(
                    user=shelter,  # Pass the PetUser instance, not the username
                    message=f'New comment on your shelter by {self.request.user.username}: {reply_text}',
                    related_link=comment_url
                )
    

class ShelterCommentRetrieve(RetrieveAPIView):
    # queryset = ShelterComment.objects.all()
    serializer_class = ShelterReplySerializer
    def get_queryset(self):
        shelter_name = self.kwargs.get('shelter_name')
        shelter = get_object_or_404(PetUser, shelter_name=shelter_name)
        return ShelterComment.objects.filter(shelter=shelter)

class ReplyCreate(CreateAPIView):
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        thread_id = self.kwargs.get('pk')
        reply = serializer.save(user=self.request.user, thread_id=thread_id)

        # Send notification to the user who made the original comment
        parent_comment = reply.thread
        notify_user = parent_comment.user

        # Check if the user replying is different from the user who made the original comment
        if notify_user != self.request.user:
            # Create a notification for the original comment's user
            reply_text = reply.text[:10] + '...' if len(reply.text) > 10 else reply.text
            Notification.objects.create(
                user=notify_user,
                message=f'New reply to your comment from {self.request.user.username}: {reply_text}',  # Truncate the reply text if it's too long
                related_link=f'/path/to/comment/{parent_comment.id}'  # Adjust the URL to the correct path
            )
        
