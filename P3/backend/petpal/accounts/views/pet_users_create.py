from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from ..models import PetUser
from accounts.serializers import PetShelterSerializer, PetSeekerSerializer

# Create your views here.
class PetShelterCreate(CreateAPIView):
    model = PetUser
    serializer_class = PetShelterSerializer
    permission_classes = (AllowAny,)

class PetSeekerCreate(CreateAPIView):
    model = PetUser
    serializer_class = PetSeekerSerializer
    permission_classes = (AllowAny,)