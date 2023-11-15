from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import PetUser
from accounts.serializers import PetShelterProfileSerializer, PetSeekerProfileSerializer

class PetShelterProfile(RetrieveAPIView):
    queryset = PetUser.objects.all().exclude(shelter_name=None).exclude(shelter_name='')
    serializer_class = PetShelterProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        shelter_pk = self.kwargs.get('pk')
        shelter = get_object_or_404(queryset, pk=shelter_pk)
        return shelter

class PetSeekerProfile(RetrieveAPIView):
    serializer_class = PetSeekerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_shelter():
            # must use application queryset please check lol
            return user.application_set.all()
        else:
            return PetUser.objects.all()
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        seeker_pk = self.kwargs.get('pk')
        seeker = get_object_or_404(queryset, pk=seeker_pk)
        return seeker