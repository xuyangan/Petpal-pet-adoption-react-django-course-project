from django.db import models
from accounts.models import PetUser
# from accounts.models import Shelter

# Create your models here.
class PetListing(models.Model):
    AVAILABLE = 'available'
    ADOPTED = 'adopted'
    PENDING = 'pending'
    STATUS_CHOICES = [
        (AVAILABLE, 'available'),
        (ADOPTED, 'adopted'),
        (PENDING, 'pending'),
    ]

    FEMALE = 'female'
    MALE = 'male'
    UNKNOWN = 'unknown'
    GENDER_CHOICES = [
        (FEMALE, 'female'),
        (MALE, 'male'),
        (UNKNOWN, 'unknown'),
    ]

    shelter = models.ForeignKey(
        PetUser, 
        on_delete=models.CASCADE, 
        related_name='pet_listings'
        )
    name = models.CharField(max_length=255)
    breed = models.CharField(max_length=255)
    age = models.PositiveIntegerField(
        default=None,
        null=True,
        blank=True,
        )
    size = models.PositiveIntegerField(
        default=None,
        null=True,
        blank=True,
        help_text='size in cm',
        )
    color = models.CharField(max_length=255)
    gender = models.CharField(
        max_length=255,
        choices=GENDER_CHOICES,
        default=None,
        null=True,
        blank=True,
        )
    status = models.CharField(
        max_length=255,
        choices=STATUS_CHOICES,
        default=AVAILABLE,
        )
    description = models.TextField(
        default=None,
        null=True,
        blank=True,
        )
    
    def __str__(self):
        return 'Pet Listing: {}'.format(self.name)