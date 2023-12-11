from django.urls import path
from .views import NotificationListView, NotificationUpdateView, NotificationDeleteView, UnreadNotificationCountView

app_name = 'notifications'
urlpatterns = [
    path('', NotificationListView.as_view(), name='list_notifications'),
    path('<int:pk>/', NotificationUpdateView.as_view(), name='get_notification'),
    path('<int:pk>/removal/', NotificationDeleteView.as_view(), name='delete_notification'),
    path('unread-count/', UnreadNotificationCountView.as_view(), name='unread-notification-count'),
]
