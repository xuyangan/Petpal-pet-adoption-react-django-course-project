from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class PetUser(AbstractUser):
    shelter_name = models.CharField(null=True, blank=True)
    REQUIRED_FIELDS = ['username', 'email']