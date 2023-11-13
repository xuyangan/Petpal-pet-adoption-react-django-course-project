from django.shortcuts import render
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import PetUser
from accounts.serializers import PetShelterSerializer, PetSeekerSerializer

class PetShelterDestroy(DestroyAPIView):
    queryset = PetUser.objects.all()
    serializer_class = PetShelterSerializer
    permission_classes = [IsAuthenticated]

class PetSeekerDestroy(DestroyAPIView):
    queryset = PetUser.objects.all()
    serializer_class = PetSeekerSerializer
    permission_classes = [IsAuthenticated]