from .base_pet_listing_serializer import BasePetListingSerializer
from rest_framework.serializers import ListField, ImageField
from pet_listings.models import PetListing, PetImage

class PetListingCreateSerializer(BasePetListingSerializer):

    images = ListField(child=ImageField(), required=False)

    def create(self, validated_data):
        images_data = validated_data.pop('images', tuple())
        pet_listing = PetListing.objects.create(**validated_data, shelter=self.context['request'].user)

        for image in images_data:
            print(image)
            image_object = PetImage(image=image, pet_listing=pet_listing)
            image_object.save()
        
        return pet_listing
    