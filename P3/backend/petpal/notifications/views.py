from django.shortcuts import render
# Import necessary Django and Django REST framework classes
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.pagination import PageNumberPagination

class NotificationSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100

class NotificationListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    pagination_class = NotificationSetPagination

    def get_queryset(self):
        # Retrieve the query parameter for filtering
        is_read_param = self.request.query_params.get('is_read')
        notifications = Notification.objects.filter(user_id=self.request.user)

        if is_read_param is not None:
            is_read = is_read_param.lower() == 'true'
            notifications = notifications.filter(is_read=is_read)

        return notifications.order_by('-created_at')

# Notification Update View
class NotificationUpdateView(UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(pk=self.kwargs.get('pk'), user=self.request.user)

    def perform_update(self, serializer):
        # Get the 'is_read' status from the request data
        is_read_status = serializer.validated_data.get('is_read')
        if is_read_status is not None:
            # Update the notification's 'is_read' status based on the request
            serializer.save(is_read=is_read_status)
        else:
            # If 'is_read' is not provided in the request, do not change it
            serializer.save()


# Notification Delete View 
class NotificationDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(pk=self.kwargs.get('pk'), user_id=self.request.user)

