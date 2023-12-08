from .base_pet_listing_serializer import BasePetListingSerializer
from rest_framework.serializers import ListField, ImageField
from pet_listings.models import PetListing, PetImage
from accounts.models import PetUser
from notifications.models import Notification
import json
from django.urls import reverse
from analytics.models import Analytics
from shelter_analytics.models import ShelterAnalytics


class PetListingCreateSerializer(BasePetListingSerializer):

    images = ListField(child=ImageField(), required=False)

    def create(self, validated_data):
        print(validated_data)
        images_data = validated_data.pop('images', tuple())
        pet_listing = PetListing.objects.create(
            **validated_data, shelter=self.context['request'].user)

        for image in images_data:
            print(image)
            image_object = PetImage(image=image, pet_listing=pet_listing)
            image_object.save()

        self.send_notifications_to_interested_seekers(pet_listing)
        analytics, _ = Analytics.objects.get_or_create(id=1)
        analytics.tot_pet_listings += 1
        analytics.save()

        shelterAnalytics = ShelterAnalytics.objects.get(shelter=self.context['request'].user)
        shelterAnalytics.num_pet_listings +=1
        shelterAnalytics.save()
        return pet_listing

    def send_notifications_to_interested_seekers(self, pet_listing):
        breed = pet_listing.breed
        potentially_interested_seekers = PetUser.objects.filter(
            preferences__isnull=False)
        pet_listing_url = reverse(
            'pet_listings:pet_listing_retrieve_update_destroy', args=[pet_listing.id])

        for seeker in potentially_interested_seekers:
            try:
                print("breed = ", breed)
                print("seeker.preferences = ", seeker.preferences)
                if breed in seeker.preferences:

                    message = f"{pet_listing.shelter.username} has a new member {pet_listing.name}, come and check it out!"
                    Notification.objects.create(
                        user=seeker,
                        message=message,
                        related_link=pet_listing_url
                    )
            except json.JSONDecodeError:
                continue
