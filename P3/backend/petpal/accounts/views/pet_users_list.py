from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import PetUser
from accounts.serializers import PetShelterProfileSerializer
from accounts.pagination import PetShelterPagination

class PetShelterList(ListAPIView):
    queryset = PetUser.objects.all().exclude(shelter_name=None).exclude(shelter_name='')
    serializer_class = PetShelterProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PetShelterPagination

# question do I just not implement one for seeker lol