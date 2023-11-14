from django.shortcuts import render
# Import necessary Django and Django REST framework classes
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer

# Notification List View
class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

# Notification Update View
class NotificationUpdateView(UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(pk=self.kwargs.get('pk'), user=self.request.user)

# Notification Delete View
class NotificationDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(pk=self.kwargs.get('pk'), user=self.request.user)

