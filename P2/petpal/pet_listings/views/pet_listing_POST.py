from rest_framework.generics import CreateAPIView
from pet_listings.serializers import PetListingCreateSerializer
from pet_listings.permissions import IsPetUser, IsShelter
from accounts.models import PetUser
from notifications.models import Notification
import json
from django.urls import reverse

class PetListingCreate(CreateAPIView):
    serializer_class = PetListingCreateSerializer
    permission_classes = [IsPetUser, IsShelter]

    def perform_create(self, serializer):
        pet_listing = serializer.save()
        self.send_notifications_to_seekers(pet_listing)

    def send_notifications_to_seekers(self, pet_listing):
        breed = pet_listing.breed
        potentially_interested_seekers = PetUser.objects.filter(preferences__isnull=False)
        
        pet_listing_url = reverse('pet_listings:pet_listing_retrieve_update_destroy', args=[pet_listing.id])

        for seeker in potentially_interested_seekers:
            try:
                if breed in json.loads(seeker.preferences):
                    message = f"{pet_listing.shelter.username} has a new member {pet_listing.name}, come and check it out!"
                    Notification.objects.create(
                        user_id=seeker,
                        message=message,
                        related_link=pet_listing_url
                    )
            except json.JSONDecodeError:
                # Handle invalid JSON format
                continue