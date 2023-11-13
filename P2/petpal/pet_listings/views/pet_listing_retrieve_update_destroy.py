from pet_listings.serializers import PetListingRetrieveUpdateDestroySerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from pet_listings.models import PetListing
from django.shortcuts import get_object_or_404
from pet_listings.permissions import IsShelter, IsPetUser

class PetListingRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = PetListingRetrieveUpdateDestroySerializer
    permission_classes = [IsPetUser]
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsShelter()]
        # 
        return super().get_permissions()
    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(PetListing, pk=pk)