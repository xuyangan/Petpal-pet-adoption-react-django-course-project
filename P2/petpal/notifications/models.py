from django.db import models
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from accounts.models import PetUser

# Create your models here.

class Notification(models.Model):
    user = models.ForeignKey(PetUser, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    link = models.URLField()  # Field to store a link to the associated model

    def __str__(self):
        return self.message
