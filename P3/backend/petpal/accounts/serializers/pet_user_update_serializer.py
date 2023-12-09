from rest_framework.serializers import ModelSerializer
from ..models import PetUser
from rest_framework.serializers import ImageField
from accounts.models import UserImage


class PetShelterUpdateSerializer(ModelSerializer):
    profile_picture = ImageField(required=False)

    class Meta:
        model = PetUser
        fields = ['email', 'password', 'shelter_name', 'phone_number', 'location', 'mission_statement', 'profile_picture']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password and password != '':
            instance.set_password(password)
            instance.save()

        images = validated_data.pop('profile_picture', tuple())
        if images is not None and len(images) > 0:
            # remove old images
            instance.profile_picture.all().delete()
            user_image = UserImage.objects.create(
                user=instance,
                image=images
            )
            user_image.save()
        return super().update(instance, validated_data)

class PetSeekerUpdateSerializer(ModelSerializer):
    profile_picture = ImageField(required=False)

    class Meta:
        model = PetUser
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'location', 'preferences', 'profile_picture']

    def update(self, instance, validated_data):
        print (validated_data)

        password = validated_data.pop('password', None)
        if password and password != '':
            instance.set_password(password)
            instance.save()
            
        images = validated_data.pop('profile_picture', tuple())
        print (images)
        if images is not None and len(images) > 0:
            # remove old images
            instance.profile_picture.all().delete()
            user_image = UserImage.objects.create(
                user=instance,
                image=images
            )
            user_image.save()
        return super().update(instance, validated_data)