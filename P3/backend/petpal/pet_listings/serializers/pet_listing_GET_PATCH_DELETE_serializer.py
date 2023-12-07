from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField, ImageField, Serializer
from pet_listings.models import PetListing, PetImage
from rest_framework.fields import ListField

class BasePetListingSerializer(ModelSerializer):
    id = PrimaryKeyRelatedField(read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)
    pet_images = SerializerMethodField()
    publication_date = SerializerMethodField()
    class Meta:
        model = PetListing
        fields = '__all__'

    def get_pet_images(self, obj):
        return [image.image.url for image in obj.pet_images.all()]
    
    def get_publication_date(self, obj):
        return obj.publication_date.strftime('%Y-%m-%d %H:%M:%S')

class PetListingRetrieveUpdateDestroySerializer(BasePetListingSerializer):

    images = ListField(child=ImageField(), required=False)

    shelter_name = SerializerMethodField()
    shelter_username = SerializerMethodField()

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', tuple())

        if not images_data: 
            # user did not provide any images, we do not change the images
            return super().update(instance, validated_data)
        # user provided images, we delete the old images and create new ones
        instance.pet_images.all().delete()
        for image in images_data:
            image_object = PetImage(image=image, pet_listing=instance)
            image_object.save()
        return super().update(instance, validated_data)
            

    def get_shelter_name(self, obj):
        return obj.shelter.shelter_name
    
    def get_shelter_username(self, obj):
        return obj.shelter.username
    