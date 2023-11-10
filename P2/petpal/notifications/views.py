from django.shortcuts import render

# Create your views here.
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from django.http import JsonResponse, Http404
from django.views.decorators.http import require_http_methods
from .models import Notification
from django.contrib.contenttypes.models import ContentType

# We're using function-based views for simplicity

@require_http_methods(["GET"])
def list_notifications(request):
    page = request.GET.get('page', 1)
    per_page = request.GET.get('per_page', 10)
    is_read = request.GET.get('is_read')

    notifications_query = Notification.objects.filter(recipient=request.user).order_by('-created_at')
    
    if is_read is not None:
        notifications_query = notifications_query.filter(is_read=is_read.lower() in ['true', '1'])

    paginator = Paginator(notifications_query, per_page)
    try:
        notifications = paginator.page(page)
    except Exception as e:  # Catch any pagination errors
        raise Http404 from e

    notifications_data = [{
        'id': notification.id,
        'is_read': notification.is_read,
        'created_at': notification.created_at,
        'content_type': notification.content_type.model,
        # Assuming the content_object has a get_absolute_url method
        'link': notification.content_object.get_absolute_url() if notification.content_object else None
    } for notification in notifications]

    return JsonResponse({
        'notifications': notifications_data,
        'has_next': notifications.has_next(),
        'has_prev': notifications.has_previous(),
    }, safe=False)

@require_http_methods(["DELETE"])
def delete_notification(request, notification_id):
    notification = get_object_or_404(Notification, pk=notification_id, recipient=request.user)
    notification.delete()
    return JsonResponse({'status': 'deleted'})

@require_http_methods(["GET"])
def get_notification(request, notification_id):
    notification = get_object_or_404(Notification, pk=notification_id, recipient=request.user)
    
    notification_data = {
        'id': notification.id,
        'is_read': notification.is_read,
        'created_at': notification.created_at,
        'content_type': notification.content_type.model,
        'link': notification.content_object.get_absolute_url() if notification.content_object else None
    }
    
    return JsonResponse(notification_data)
