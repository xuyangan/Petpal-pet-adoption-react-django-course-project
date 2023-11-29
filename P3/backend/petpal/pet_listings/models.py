from django.db import models
from accounts.models import PetUser
# from accounts.models import Shelter

# Create your models here.
class PetListing(models.Model):
    AVAILABLE = 'available'
    ADOPTED = 'adopted'
    PENDING = 'pending'
    WITHDRAWN = 'withdrawn'
    STATUS_CHOICES = [
        (AVAILABLE, 'available'),
        (ADOPTED, 'adopted'),
        (PENDING, 'pending'),
        (WITHDRAWN, 'withdrawn'),
    ]

    UNKOWN = 'unknown'
    FEMALE = 'female'
    MALE = 'male'
    GENDER_CHOICES = [
        (UNKOWN, 'unknown'),
        (FEMALE, 'female'),
        (MALE, 'male'),
    ]

    UNKOWN = 4
    SMALL = 1
    MEDIUM = 2
    LARGE = 3
    SIZE_CHOICES = [
        (UNKOWN, 'unknown'),
        (SMALL, 'small'),
        (MEDIUM, 'medium'),
        (LARGE, 'large'),
    ]

    shelter = models.ForeignKey(
        PetUser, 
        on_delete=models.CASCADE, 
        related_name='pet_listings',
        null=False,
        blank=False,
        )
    name = models.CharField(
        max_length=255,
        default="N/A",
        null=False,
        blank=False,
        )
    breed = models.CharField(
        max_length=255,
        default="N/A",
        null=False,
        blank=False,
        )
    age = models.PositiveIntegerField(
        default=1,
        null=False,
        blank=False,
        )
    size = models.PositiveIntegerField(
        choices=SIZE_CHOICES,
        default= UNKOWN,
        null=False,
        blank=False,
        )
    gender = models.CharField(
        max_length=255,
        choices=GENDER_CHOICES,
        default=UNKOWN,
        null=False,
        blank=False,
        )
    status = models.CharField(
        max_length=255,
        choices=STATUS_CHOICES,
        default=AVAILABLE,
        null=False,
        blank=False,
        )
    colour = models.CharField(
        max_length=255,
        default="N/A",
        null=False,
        blank=False,
        )
    location = models.CharField(
        max_length=255,
        default="N/A",
        null=False,
        blank=False,
        )
    description = models.TextField(
        default="N/A",
        null=False,
        blank=False,
        )
    behaviour = models.TextField(
        default="N/A",
        null=False,
        blank=False,
        )  
    requirements = models.TextField(
        default="N/A",
        null=False,
        blank=False,
        )
    medical_history = models.TextField(
        default="N/A",
        null=False,
        blank=False,
        )
    publication_date = models.DateTimeField(
        auto_now_add=True
        )
    
    def __str__(self):
        return 'Pet Listing: {}'.format(self.name)
    
class PetImage(models.Model):
        pet_listing = models.ForeignKey(
            PetListing, 
            on_delete=models.CASCADE, 
            related_name='pet_images'
            )
        image = models.ImageField(
            upload_to='pet_images',
            null=True,
            blank=True,
            )
        def __str__(self):
            return 'Pet Image: {}'.format(self.image)