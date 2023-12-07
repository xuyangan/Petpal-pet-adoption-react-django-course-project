from django.db import models
from accounts.models import PetUser

# Create your models here.
class ShelterAnalytics(models.Model):
    num_pet_listings = models.PositiveIntegerField(
        default=0,
        null=False,
        blank=False,
    )
    accepted_pets = models.PositiveIntegerField(
        default=0,
        null=False,
        blank=False,
    )
    creation_time = models.DateTimeField(auto_now_add=True)

    shelter = models.ForeignKey(
        PetUser,
        on_delete=models.CASCADE, 
        related_name='shelter_analytics',
        null=False,
        blank=False,
    )