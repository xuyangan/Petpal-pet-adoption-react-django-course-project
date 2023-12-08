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
    # profile_picture = models.ImageField(null=True, blank=True, upload_to='pet_images')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def is_shelter(self) -> bool:
        return self.shelter_name is not None and self.shelter_name != ''
    
    def is_preference(self, preference) -> bool:
        return preference in self.preferences
    

class UserImage(models.Model):
    user = models.ForeignKey(
        PetUser, 
        on_delete=models.CASCADE, 
        related_name='profile_picture'
        )
    image = models.ImageField(
        upload_to='user_images',
        null=True,
        blank=True,
        )
    
    def __str__(self):
        return 'User Image: {}'.format(self.user.username)