from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Reply, ShelterComment
from notifications.models import Notification

@receiver(post_save, sender=Reply)
def new_reply_notification(sender, instance, created, **kwargs):
    if created:
        parent_comment = instance.thread
        notify_user = parent_comment.user

        # Don't notify if the user is replying to their own comment
        if notify_user != instance.user:
            # Check if the reply text is longer than 10 characters
            reply_text = instance.text[:10] + '...' if len(instance.text) > 10 else instance.text
            Notification.objects.create(
                user_id=notify_user,
                message=f'New reply to your comment: {reply_text}'
            )

@receiver(post_save, sender=ShelterComment)
def new_comment_notification(sender, instance, created, **kwargs):
    if created:
        shelter_user = instance.shelter  # Assuming 'shelter' is the field linking to the shelter's PetUser

        # Don't notify if the shelter is posting a comment to their own shelter
        if shelter_user != instance.user:
            # Check if the comment text is longer than 10 characters
            comment_text = instance.text[:10] + '...' if len(instance.text) > 10 else instance.text
            Notification.objects.create(
                user_id=shelter_user,
                message=f'New comment received: {comment_text}'
            )
