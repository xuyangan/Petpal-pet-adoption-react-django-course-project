from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Reply
from notifications.models import Notification

@receiver(post_save, sender=Reply)
def new_reply_notification(sender, instance, created, **kwargs):
    if created:
        parent_comment = instance.thread
        notify_user = parent_comment.user
        Notification.objects.create(
            user_id=notify_user,
            message=f'New reply to your comment: {instance.text[:50]}...' 
        )
