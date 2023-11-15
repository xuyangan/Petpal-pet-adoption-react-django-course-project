from rest_framework.generics import ListAPIView
from pet_listings.serializers import PetListingListSerializer
from pet_listings.permissions import IsPetUser
from pet_listings.models import PetListing
from pet_listings.pagination import PetListingPagination

class PetListingList(ListAPIView):
    serializer_class = PetListingListSerializer
    permission_classes = [IsPetUser]
    pagination_class = PetListingPagination


    def get_queryset(self):
        pet_user = self.request.user

        if pet_user.is_shelter():
            return PetListing.objects.filter(shelter=pet_user)
        else:
            return PetListing.objects.all()
