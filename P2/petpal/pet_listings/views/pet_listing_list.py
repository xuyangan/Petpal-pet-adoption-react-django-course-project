from rest_framework.generics import ListAPIView
from pet_listings.models import PetListing
from accounts.models import PetUser
from pet_listings.serializers import PetListingListSerializer
from django.shortcuts import get_object_or_404
from pet_listings.permissions import IsPetUser

class PetListingList(ListAPIView):
    serializer_class = PetListingListSerializer
    permission_classes = [IsPetUser]

    def get_queryset(self):
        pet_user_pk = self.request.user.pk
        pet_user = get_object_or_404(PetUser, pk=pet_user_pk)
        # check if the PetUser is a shelter or seeker
        if pet_user.is_shelter:
            # return pet_listing that belong to the shelter
            return PetListing.objects.filter(shelter=pet_user)

        else: # pet_user.is_seeker
            # return all pet_listings
            return PetListing.objects.all()
