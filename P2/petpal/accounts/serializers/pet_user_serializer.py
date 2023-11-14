from rest_framework.serializers import ModelSerializer, CharField
from ..models import PetUser

class PetShelterSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = PetUser
        fields = ['id', 'username', 'email', 'password', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

    def create(self, validated_data):
        user = super(PetShelterSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class PetSeekerSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = PetUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'location', 'preferences', 'profile_picture']

    def create(self, validated_data):
        user = super(PetSeekerSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user