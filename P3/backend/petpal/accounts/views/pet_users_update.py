from django.shortcuts import render
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import PetUser
from accounts.serializers import PetShelterUpdateSerializer, PetSeekerUpdateSerializer

class PetShelterUpdate(UpdateAPIView):
    queryset = PetUser.objects.all()
    serializer_class = PetShelterUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class PetSeekerUpdate(UpdateAPIView):
    queryset = PetUser.objects.all()
    serializer_class = PetSeekerUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user