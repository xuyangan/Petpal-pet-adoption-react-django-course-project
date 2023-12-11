from django.urls import path
from .views import NotificationListView, NotificationUpdateView, NotificationDeleteView

app_name = 'notifications'
urlpatterns = [
    path('', NotificationListView.as_view(), name='list_notifications'),
    path('<int:pk>/', NotificationUpdateView.as_view(), name='get_notification'),
    path('<int:pk>/removal/', NotificationDeleteView.as_view(), name='delete_notification'),
]
