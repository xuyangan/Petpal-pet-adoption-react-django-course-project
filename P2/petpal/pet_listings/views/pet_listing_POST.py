from rest_framework.generics import CreateAPIView
from pet_listings.serializers import PetListingCreateSerializer
from pet_listings.permissions import IsPetUser, IsShelter

class PetListingCreate(CreateAPIView):
    serializer_class = PetListingCreateSerializer
    permission_classes = [IsPetUser, IsShelter]


