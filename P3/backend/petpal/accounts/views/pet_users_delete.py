from django.shortcuts import render
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import PetUser
from accounts.serializers import PetShelterSerializer, PetSeekerSerializer
from analytics.models import Analytics

class PetShelterDestroy(DestroyAPIView):
    queryset = PetUser.objects.all()
    serializer_class = PetShelterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        analytics = Analytics.objects.get(id=1)  # Assuming a single Analytics instance
        analytics.num_shelters = max(0, analytics.num_shelters - 1)
        analytics.save()
        return self.request.user

class PetSeekerDestroy(DestroyAPIView):
    queryset = PetUser.objects.all()
    serializer_class = PetSeekerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        analytics = Analytics.objects.get(id=1)  # Assuming a single Analytics instance
        analytics.num_seekers = max(0, analytics.num_seekers - 1)
        analytics.save()
        return self.request.user