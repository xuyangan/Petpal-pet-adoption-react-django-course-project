from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField, ImageField, Serializer
from pet_listings.models import PetListing, PetImage
from rest_framework.fields import ListField

class BasePetListingSerializer(ModelSerializer):
    id = PrimaryKeyRelatedField(read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)
    pet_images = SerializerMethodField()
    class Meta:
        model = PetListing
        fields = '__all__'

    def get_pet_images(self, obj):
        return [image.image.url for image in obj.pet_images.all()]

# class PetImageInlineSerializer(ModelSerializer):
#     # image = ImageField()
#     class Meta:
#         model = PetImage
#         fields = ['image']

class BulkAddImageSerializer(Serializer):
    images = ListField(child=ImageField(), required=False)
    def create(self, validated_data):
        images = []
        for image in validated_data.get('images', tuple()):
            image_object = PetImage(image=image)
            image_object.save()
            images.append(image_object)
        return images

class PetListingListCreateSerializer(BasePetListingSerializer):

    images = ListField(child=ImageField(), required=False)

    def create(self, validated_data):
        images_data = validated_data.pop('images', tuple())
        pet_listing = PetListing.objects.create(**validated_data, shelter=self.context['request'].user)
        
        for image in images_data:
            print(image)
            image_object = PetImage(image=image, pet_listing=pet_listing)
            image_object.save()
        
        return pet_listing
    

class PetListingRetrieveUpdateDestroySerializer(BasePetListingSerializer):

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
