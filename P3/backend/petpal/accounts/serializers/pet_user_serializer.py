from rest_framework.serializers import ModelSerializer, CharField
from ..models import PetUser
from analytics.models import Analytics
from shelter_analytics.models import ShelterAnalytics

class PetShelterSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = PetUser
        fields = ['id', 'username', 'email', 'password', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

    def create(self, validated_data):
        user = super(PetShelterSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        analytics, _ = Analytics.objects.get_or_create(id=1)
        analytics.num_shelters += 1
        analytics.save()

        ShelterAnalytics.objects.create(
                shelter = user
        )
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
        analytics, _ = Analytics.objects.get_or_create(id=1)
        analytics.num_seekers += 1
        analytics.save()
        return user