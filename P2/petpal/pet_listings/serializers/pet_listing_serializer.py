from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from pet_listings.models import PetListing

class PetListingListCreateSerializer(ModelSerializer):
    # shelter = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = PetListing
        fields = '__all__'
        read_only_fields = ['shelter']

class PetListingRetrieveUpdateDestroySerializer(ModelSerializer):
    class Meta:
        model = PetListing
        fields = '__all__'
        read_only_fields = ['shelter']