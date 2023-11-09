from django.db import models
from accounts.models import PetUser

# Create your models here.
class Comment(models.Model):
    commenter = models.ForeignKey(PetUser, on_delete=models.CASCADE)
    comment = models.TextField()
    rating = models.IntegerField(null=True, blank=True)
    replied = models.ForeignKey(PetUser, null=True)