from rest_framework.serializers import ModelSerializer
from ..models import PetUser

class PetShelterUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['email', 'password', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

class PetSeekerUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['email', 'password', 'phone_number', 'location', 'preferences', 'profile_picture']