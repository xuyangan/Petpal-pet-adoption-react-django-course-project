from django.db import models
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from accounts.models import PetUser

# Create your models here.

class Notification(models.Model):
    user_id = models.ForeignKey(PetUser, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=128)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
