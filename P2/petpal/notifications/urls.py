from django.urls import path
from . import views

urlpatterns = [
    path('notifications/', views.list_notifications, name='list_notifications'),
    path('notifications/<int:notification_id>/', views.get_notification, name='get_notification'),
    path('notifications/<int:notification_id>/delete/', views.delete_notification, name='delete_notification'),
]
