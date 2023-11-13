from rest_framework.generics import ListCreateAPIView
from pet_listings.models import PetListing
from pet_listings.serializers import PetListingListCreateSerializer, PetListingListSerializer
from accounts.models import PetUser
from pet_listings.models import PetImage
from django.shortcuts import get_object_or_404
from pet_listings.permissions import IsShelter, IsPetUser
from rest_framework.permissions import AllowAny


class PetListingListCreate(ListCreateAPIView):
    serializer_class = PetListingListCreateSerializer
    permission_classes = [IsPetUser]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsShelter()]
        # 
        return super().get_permissions()

    def get_queryset(self):
        pet_user = self.request.user

        if pet_user.is_shelter():
            return PetListing.objects.filter(shelter=pet_user)
        else:
            return PetListing.objects.all()