from rest_framework.serializers import ModelSerializer
from ..models import PetUser

class PetShelterUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['email', 'password', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class PetSeekerUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'location', 'preferences', 'profile_picture']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)