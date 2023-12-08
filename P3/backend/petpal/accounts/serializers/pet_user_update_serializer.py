from rest_framework.serializers import ModelSerializer
from ..models import PetUser
from rest_framework.serializers import SerializerMethodField, ImageField

class PetShelterUpdateSerializer(ModelSerializer):
    profile_picture = ImageField(required=False)

    class Meta:
        model = PetUser
        fields = ['email', 'password', 'shelter_name', 'phone_number', 'location', 'mission_statement']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class PetSeekerUpdateSerializer(ModelSerializer):
    profile_picture = ImageField(required=False)

    class Meta:
        model = PetUser
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'location', 'preferences']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)