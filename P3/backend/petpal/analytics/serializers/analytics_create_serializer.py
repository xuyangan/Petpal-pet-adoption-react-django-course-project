from rest_framework.serializers import ModelSerializer, CharField
from ..models import Analytics

class AnalyticsSerializer(ModelSerializer):
    class Meta:
        model = Analytics