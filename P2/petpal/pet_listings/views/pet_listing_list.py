from rest_framework.generics import ListAPIView
from pet_listings.models import PetListing
from accounts.models import PetUser
from pet_listings.serializers import PetListingListSerializer
from django.shortcuts import get_object_or_404

class PetListingList(ListAPIView):
    serializer_class = PetListingListSerializer
    def get_queryset(self):
        # check if the user is none or is not authenticated or is anonymous
        if not self.request.user or \
           not self.request.user.is_authenticated or \
               self.request.user.is_anonymous:
            # return an empty queryset
            print ("PetListingList: no user")
            return PetListing.objects.none()
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
