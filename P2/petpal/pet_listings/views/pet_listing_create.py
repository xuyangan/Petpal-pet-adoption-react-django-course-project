from rest_framework.generics import CreateAPIView
from pet_listings.serializers import PetListingListCreateSerializer
from pet_listings.permissions import IsShelter

class PetListingCreate(CreateAPIView):
    serializer_class = PetListingListCreateSerializer
    permission_classes = [IsShelter]
