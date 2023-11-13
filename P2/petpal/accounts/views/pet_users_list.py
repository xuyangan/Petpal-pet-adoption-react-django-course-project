from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import PetUser
from accounts.serializers import PetShelterProfileSerializer

class PetShelterList(ListAPIView):
    queryset = PetUser.objects.all().exclude(shelter_name=None).exclude(shelter_name='')
    serializer_class = PetShelterProfileSerializer
    permission_classes = [IsAuthenticated]

# question do I just not implement one for seeker lol