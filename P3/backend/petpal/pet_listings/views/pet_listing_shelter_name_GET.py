from rest_framework.generics import ListAPIView
from pet_listings.serializers import PetListingListSerializer
from pet_listings.permissions import IsPetUser
from pet_listings.models import PetListing
from pet_listings.pagination import PetListingPaginationSmall
from accounts.models import PetUser

class PetListingShelterList(ListAPIView):
    serializer_class = PetListingListSerializer
    permission_classes = [IsPetUser]
    pagination_class = PetListingPaginationSmall


    def get_queryset(self):
        shelter = self.kwargs.get('shelter_name')
        user = PetUser.objects.get(username=shelter)
        return user.pet_listings.all()
