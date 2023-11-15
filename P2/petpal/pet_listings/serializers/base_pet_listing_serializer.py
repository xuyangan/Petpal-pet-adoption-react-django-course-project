from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField, ImageField, Serializer
from pet_listings.models import PetListing

class BasePetListingSerializer(ModelSerializer):
    id = PrimaryKeyRelatedField(read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)
    pet_images = SerializerMethodField()
    class Meta:
        model = PetListing
        fields = '__all__'

    def get_pet_images(self, obj):
        return [image.image.url for image in obj.pet_images.all()]