from rest_framework.generics import ListCreateAPIView
from pet_listings.models import PetListing
from pet_listings.serializers import PetListingListCreateSerializer, PetListingListSerializer
from accounts.models import PetUser
from pet_listings.models import PetImage
from django.shortcuts import get_object_or_404
from pet_listings.permissions import IsShelter, IsPetUser


class PetListingListCreate(ListCreateAPIView):
    serializer_class = PetListingListCreateSerializer
    permission_classes = [IsPetUser]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsShelter()]
        # 
        return super().get_permissions()

    def get_queryset(self):
        # otherwise, get the PetUser object
        pet_user_pk = self.request.user.pk
        pet_user = get_object_or_404(PetUser, pk=pet_user_pk)
        # check if the PetUser is a shelter or seeker
        if pet_user.is_shelter:
            # return pet_listing that belong to the shelter
            return PetListing.objects.filter(shelter=pet_user)

        else: # pet_user.is_seeker
            # return all pet_listings
            return PetListing.objects.all()