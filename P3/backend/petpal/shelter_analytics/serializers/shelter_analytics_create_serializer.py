from rest_framework.serializers import ModelSerializer, CharField
from ..models import ShelterAnalytics

class ShelterAnalyticsSerializer(ModelSerializer):
    class Meta:
        model = ShelterAnalytics