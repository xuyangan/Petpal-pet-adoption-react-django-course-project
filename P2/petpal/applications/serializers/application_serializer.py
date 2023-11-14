from rest_framework.serializers import ModelSerializer
from applications.models import Application


class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        exclude = ('pet_listing', 'status',)
