from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from analytics.models import Analytics
from analytics.serializers import AnalyticsSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class AnalyticsRetrieve(RetrieveAPIView):
    serializer_class = AnalyticsSerializer
    permission_classes = (AllowAny,)
    queryset = Analytics.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        shelter = get_object_or_404(queryset, pk=1)
        return shelter