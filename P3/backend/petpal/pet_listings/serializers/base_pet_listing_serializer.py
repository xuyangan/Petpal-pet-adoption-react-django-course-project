from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField, ImageField, Serializer
from pet_listings.models import PetListing

class BasePetListingSerializer(ModelSerializer):
    id = PrimaryKeyRelatedField(read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)
    shelter_name = SerializerMethodField()
    pet_images = SerializerMethodField()
    publication_date = SerializerMethodField()
    class Meta:
        model = PetListing
        fields = '__all__'

    def get_pet_images(self, obj):
        return [image.image.url for image in obj.pet_images.all()]
    
    def get_shelter_name(self, obj):
        return obj.shelter.shelter_name
    
    def get_publication_date(self, obj):
        return obj.publication_date.strftime('%Y-%m-%d %H:%M:%S')
