from django.db import models

# Create your models here.
class Analytics(models.Model):
    tot_pet_listings = models.PositiveIntegerField(
        default=0,
        null=False,
        blank=False,
    )
    accepted_pets = models.PositiveIntegerField(
        default=0,
        null=False,
        blank=False,
    )
    num_shelters = models.PositiveIntegerField(
        default=0,
        null=False,
        blank=False,
    )
    num_seekers = models.PositiveIntegerField(
        default=0,
        null=False,
        blank=False,
    )