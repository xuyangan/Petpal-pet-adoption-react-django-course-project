from django.shortcuts import render
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import AllowAny
from ..models import PetUser
from accounts.serializers import PetShelterUpdateSerializer, PetSeekerUpdateSerializer

# need to find out how to make sure only the same user can update
class PetShelterUpdate(UpdateAPIView):
    model = PetUser
    serializer_class = PetShelterUpdateSerializer

class PetSeekerUpdate(UpdateAPIView):
    model = PetUser
    serializer_class = PetSeekerUpdateSerializer