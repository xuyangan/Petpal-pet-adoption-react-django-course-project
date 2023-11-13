from rest_framework.serializers import ModelSerializer
from ..models import PetUser

class PetShelterProfileSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'email', 'shelter_name']

class PetSeekerProfileSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'email', 'first_name', 'last_name']