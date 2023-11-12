from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField
from pet_listings.models import PetListing, PetImage
from rest_framework.fields import ListField

class BasePetListingSerializer(ModelSerializer):
    shelter = PrimaryKeyRelatedField(read_only=True)
    images = SerializerMethodField()
    class Meta:
        model = PetListing
        fields = '__all__'

    def get_images(self, obj):
        return [image.image.url for image in obj.pet_images.all()]

class PetImageInlineSerializer(ModelSerializer):
    class Meta:
        model = PetImage
        fields = ['image']

class PetListingListCreateSerializer(BasePetListingSerializer):
    pet_images = ListField(
        child=PetImageInlineSerializer(), 
        write_only=True,
        required=False
        )

    def create(self, validated_data):
        pet_images = validated_data.pop('pet_images', [])
        pet_listing = PetListing.objects.create(**validated_data, shelter=self.context['request'].user)
        for pet_image in pet_images:
            PetImage.objects.create(pet_listing=pet_listing, image=pet_image)
        return pet_listing
    

class PetListingRetrieveUpdateDestroySerializer(BasePetListingSerializer):
    
    pet_images = ListField(
        child=PetImageInlineSerializer(), 
        write_only=True,
        required=False
        )
    
    def update(self, instance, validated_data):
        pet_images_data = validated_data.pop('pet_images', None)
        instance = super().update(instance, validated_data)

        if pet_images_data is not None:
            instance.pet_images.all().delete()
            for pet_image_data in pet_images_data:
                PetImage.objects.create(pet_listing=instance, image=pet_image_data)
        return instance



class PetListingListSerializer(BasePetListingSerializer):
    shelter = PrimaryKeyRelatedField(read_only=True)