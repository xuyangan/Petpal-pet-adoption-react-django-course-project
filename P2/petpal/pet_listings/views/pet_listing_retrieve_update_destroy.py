from pet_listings.serializers import PetListingRetrieveUpdateDestroySerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from pet_listings.models import PetListing
from django.shortcuts import get_object_or_404

class PetListingRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):

    serializer_class = PetListingRetrieveUpdateDestroySerializer
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(PetListing, pk=pk)