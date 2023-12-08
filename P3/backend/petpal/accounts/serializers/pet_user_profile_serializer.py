from rest_framework.serializers import ModelSerializer
from ..models import PetUser
from rest_framework.serializers import SerializerMethodField

class PetShelterProfileSerializer(ModelSerializer):

    profile_picture = SerializerMethodField()
    class Meta:
        model = PetUser
        fields = ['username', 'email', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

    def get_profile_picture(self, obj):
        return [image.image.url for image in obj.profile_picture.all()]
    
class PetSeekerProfileSerializer(ModelSerializer):

    profile_picture = SerializerMethodField()
    class Meta:
        model = PetUser
        fields = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'location', 'preferences', 'profile_picture']

    def get_profile_picture(self, obj):
        return [image.image.url for image in obj.profile_picture.all()]
        