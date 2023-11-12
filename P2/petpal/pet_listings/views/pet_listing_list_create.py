from rest_framework.generics import ListCreateAPIView
from pet_listings.models import PetListing
from pet_listings.serializers import PetListingListCreateSerializer

class PetListingListCreate(ListCreateAPIView):
    serializer_class = PetListingListCreateSerializer
    def get_queryset(self):
        queryset = PetListing.objects.all()
        # pet_type = self.request.query_params.get('pet_type', None)
        # if pet_type is not None:
        #     queryset = queryset.filter(pet_type=pet_type)
        return queryset
    
    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(shelter=self.request.user)
