from rest_framework.serializers import ModelSerializer
from ..models import PetUser

class PetShelterProfileSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'email', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

class PetSeekerProfileSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'location', 'preferences', 'profile_picture']