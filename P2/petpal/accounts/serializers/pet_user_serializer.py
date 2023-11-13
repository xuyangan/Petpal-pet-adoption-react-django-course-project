from rest_framework.serializers import ModelSerializer
from ..models import PetUser

class PetShelterSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['id', 'username', 'email', 'password', 'shelter_name']

    def create(self, validated_data):
        user = super(PetShelterSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class PetSeekerSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = super(PetSeekerSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user