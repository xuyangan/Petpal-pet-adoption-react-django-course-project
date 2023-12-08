from rest_framework.serializers import ModelSerializer, CharField
from ..models import PetUser
from analytics.models import Analytics
from shelter_analytics.models import ShelterAnalytics
from rest_framework.serializers import ImageField
from accounts.models import UserImage

class PetShelterSerializer(ModelSerializer):
    password = CharField(write_only=True)
    profile_picture = ImageField(required=False)

    class Meta:
        model = PetUser
        fields = ['id', 'username', 'email', 'password', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

    def create(self, validated_data):
        images = validated_data.pop('profile_picture', None)
        
        user = super(PetShelterSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        if images is not None:
            # create a new image object
            user_image = UserImage.objects.create(
                user=user,
                image=images
            )
            user_image.save()
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
    profile_picture = ImageField(required=False)
    class Meta:
        model = PetUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'location', 'preferences', 'profile_picture']

    def create(self, validated_data):
        print(validated_data)
        images = validated_data.pop('profile_picture',tuple())
        print(images)
        
        user = super(PetSeekerSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        if images is not None:
            # create a new image object
            
            user_image = UserImage.objects.create(
                user=user,
                image=images
            )
            user_image.save()
        user.save()
        analytics, _ = Analytics.objects.get_or_create(id=1)
        analytics.num_seekers += 1
        analytics.save()
        return user