from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class PetUser(AbstractUser):
    shelter_name = models.CharField(
        max_length=255,
        null=True,
        blank=True)
    phone_number = models.CharField(
        max_length=15,
        null=True,
        blank=True
    )
    location = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )
    preferences = models.TextField(null=True, blank=True)
    mission_statement = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(null=True, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def is_shelter(self) -> bool:
        return self.shelter_name is not None and self.shelter_name != ''
    
    def is_preference(self, preference) -> bool:
        return preference in self.preferences