from django.db import models
from django.utils import timezone
from pet_listings.models import PetListing
from accounts.models import PetUser


class Application(models.Model):

    pet_listing = models.ForeignKey(
        PetListing,
        on_delete=models.CASCADE,
        related_name='applications',
        null=False,
        blank=False,
    )

    pet_name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    pet_seeker = models.ForeignKey(
        PetUser,
        on_delete=models.CASCADE,
        related_name='seeker_applications',
        null=True,
        limit_choices_to={'shelter_name__isnull': True},
    )

    pet_shelter = models.ForeignKey(
        PetUser,
        on_delete=models.CASCADE,
        related_name='shelter_applications',
        null=True,
        limit_choices_to={'shelter_name__isnull': False},
    )

    YES = 1
    NO = 0

    BINARY_CHOICES = [(YES, 'yes'), (NO, 'no'),]

    all_agree = models.PositiveIntegerField(
        choices=BINARY_CHOICES,
        default=NO,
        null=False,
        blank=False,
    )

    considerate = models.PositiveIntegerField(
        choices=BINARY_CHOICES,
        default=NO,
        null=False,
        blank=False,
    )

    medical = models.PositiveIntegerField(
        choices=BINARY_CHOICES,
        default=NO,
        null=False,
        blank=False,
    )

    full_name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    email = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    phone_number = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    AGE_RANGE_CHOICES = [
        ('18-25', '18-25'),
        ('25-30', '25-30'),
        ('30-40', '30-40'),
        ('40-50', '40-50'),
        ('50+', '50+')
    ]

    age_range = models.CharField(
        max_length=10,
        choices=AGE_RANGE_CHOICES,
        default='18-25',
        null=False,
        blank=False,
    )

    DETACHED_HOUSE = 'Detached House'
    TOWNHOUSE = 'Townhouse'
    APARTMENT_CONDO = 'Apartment/Condo'
    OUTDOOR_SPACE_FENCED = 'With outdoor space (fenced)'
    OUTDOOR_SPACE_UNFENCED = 'With outdoor space (unfenced)'
    NO_OUTDOOR_SPACE = 'No outdoor space'
    LIVE_ALONE = 'I live alone'
    ROOMMATES_FAMILY = 'I share a space with roommates/family'
    RENT_HOME = 'I rent my home'
    OWN_HOME = 'I own my home'

    LIVING_ARRANGEMENT_CHOICES = [
        (DETACHED_HOUSE, 'Detached House'),
        (TOWNHOUSE, 'Townhouse'),
        (APARTMENT_CONDO, 'Apartment/Condo'),
        (OUTDOOR_SPACE_FENCED, 'With outdoor space (fenced)'),
        (OUTDOOR_SPACE_UNFENCED, 'With outdoor space (unfenced)'),
        (NO_OUTDOOR_SPACE, 'No outdoor space'),
        (LIVE_ALONE, 'I live alone'),
        (ROOMMATES_FAMILY, 'I share a space with roommates/family'),
        (RENT_HOME, 'I rent my home'),
        (OWN_HOME, 'I own my home'),
    ]

    living_arrangement = models.CharField(
        max_length=50,
        choices=LIVING_ARRANGEMENT_CHOICES,
        default=LIVE_ALONE,
        null=False,
        blank=False,
    )

    have_applied = models.PositiveIntegerField(
        choices=BINARY_CHOICES,
        default=NO,
        null=False,
        blank=False,
    )

    street_address = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    city = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    province = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    postal_code = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )

    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DENIED = 'denied'
    WITHDRAWN = 'withdrawn'

    STATUS_CHOICES = [
        (PENDING, 'pending'),
        (ACCEPTED, 'accepted'),
        (DENIED, 'denied'),
        (WITHDRAWN, 'withdrawn'),
    ]

    status = models.CharField(
        choices=STATUS_CHOICES,
        max_length=255,
        default=PENDING,
        null=False,
        blank=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=True,
    )
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.pet_name = self.pet_listing.name
        if self.pet_seeker.is_shelter():
            raise ValueError("A shelter cannot apply for a pet")
        self.updated_at = timezone.now()
        super(Application, self).save(*args, **kwargs)

    def __str__(self):
        return 'Application for {}: {}'.format(self.pet_name, self.id)

    # def delete(self, *args, **kwargs):
    #     # Check if the deletion is part of deleting the associated PetListing
    #     if self.pet_listing and kwargs.get('delete_pet_listing', False):
    #         super(Application, self).delete(*args, **kwargs)
    #     else:
    #         # Raise an exception or handle the situation accordingly
    #         raise ValueError(
    #             "Deleting an application is not allowed unless it's part of deleting the associated PetListing.")


class Message(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(PetUser, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} for Application {self.application.id}"
