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

# Notification List View
# # class NotificationListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):
#         # Retrieve the query parameter for filtering (e.g., ?is_read=true)
#         is_read_param = request.query_params.get('is_read')

#         # Build the base queryset
#         notifications = Notification.objects.filter(user_id=request.user)

#         # Apply the filter if the 'is_read' parameter is provided
#         if is_read_param is not None:
#             is_read = is_read_param.lower() == 'true'
#             notifications = notifications.filter(is_read=is_read)

#         # Order the notifications
#         notifications = notifications.order_by('-created_at')

#         # Serialize and return the notifications
#         serializer = NotificationSerializer(notifications, many=True)
#         return Response(serializer.data)
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
        return Notification.objects.filter(pk=self.kwargs.get('pk'), user_id=self.request.user)
    def perform_update(self, serializer):
        serializer.save(is_read=True)

# Notification Delete View
class NotificationDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(pk=self.kwargs.get('pk'), user_id=self.request.user)

