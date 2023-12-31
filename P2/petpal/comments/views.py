from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, \
    CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ShelterCommentSerializer, ReplySerializer, \
    ShelterReplySerializer
from .models import ShelterComment

# Create your views here.
class ShelterCommentListCreate(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        shelter_pk = self.kwargs.get('shelter_pk')
        return ShelterComment.objects.filter(shelter_id=shelter_pk).order_by('-create_time')

    def perform_create(self, serializer):
        shelter_pk = self.kwargs.get('shelter_pk')
        serializer.save(user=self.request.user, shelter_id=shelter_pk)

class ShelterCommentRetrieve(RetrieveAPIView):
    # queryset = ShelterComment.objects.all()
    serializer_class = ShelterReplySerializer
    def get_queryset(self):
        shelter_pk = self.kwargs.get('shelter_pk')
        # Filter by shelter ID
        return ShelterComment.objects.filter(shelter_id=shelter_pk)

class ReplyCreate(CreateAPIView):
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        thread_id = self.kwargs.get('pk')  # Get topic ID from URL
        serializer.save(user=self.request.user, thread_id=thread_id)