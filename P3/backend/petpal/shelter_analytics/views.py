from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from shelter_analytics.models import ShelterAnalytics
from shelter_analytics.serializers import ShelterAnalyticsSerializer
from django.shortcuts import get_object_or_404
from accounts.models import PetUser

# Create your views here.
class ShelterAnalyticsRetrieve(RetrieveAPIView):
    serializer_class = ShelterAnalyticsSerializer
    permission_classes = (AllowAny,)
    queryset = ShelterAnalytics.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        sheltername = self.kwargs.get('sheltername')
        shelter = PetUser.objects.get(username=sheltername)
        final_shelter = get_object_or_404(queryset, shelter=shelter.pk)
        return final_shelter