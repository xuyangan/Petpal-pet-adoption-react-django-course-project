from rest_framework.serializers import ModelSerializer
from ..models import PetUser

class PetShelterUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['email', 'password', 'shelter_name']

class PetSeekerUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['email', 'password']