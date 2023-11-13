from rest_framework.generics import ListAPIView
from pet_listings.models import PetListing
from accounts.models import PetUser
from django.shortcuts import get_object_or_404, redirect
from pet_listings.permissions import IsPetUser
from pet_listings.serializers import  PetListingQuerySerializer, PetListingListSerializer
from rest_framework.permissions import AllowAny


class PetListingQueryList(ListAPIView):
    serializer_class = PetListingListSerializer
    permission_classes = [IsPetUser]

    def get_queryset(self):
        filters = PetListingQuerySerializer(data=self.request.query_params)
        queryset = self.get_shelter_or_seeker_queryset()

        if not filters.is_valid():
            print("PetListingQueryList: invalid filters")
            return queryset
        
        data = filters.validated_data

        if 'shelter_name' in data:
            if data.get('shelter_name') and data.get('shelter_name') != '':
                shelters = PetUser.objects.filter(shelter_name__icontains=data.get('shelter_name'))
                queryset = queryset.filter(shelter__in=shelters)
        if 'breed' in data:
            queryset = queryset.filter(breed__icontains=data['breed'])
        if 'status' in data:
            queryset = queryset.filter(status=data['status'])
        if 'size' in data:
            queryset = queryset.filter(size=data['size'])
        if 'min_age' in data:
            queryset = queryset.filter(age__gte=data['min_age'])
        if 'max_age' in data:
            queryset = queryset.filter(age__lte=data['max_age'])
        if 'colour' in data:
            queryset = queryset.filter(colour__icontains=data['colour'])
        if 'gender' in data:
            queryset = queryset.filter(gender=data['gender'])
        if 'sort_by_name' in data and data.get('sort_by_name'):
            queryset = queryset.order_by('name')
        if 'sort_by_age' in data and data.get('sort_by_age'):
            queryset = queryset.order_by('age')
        if 'sort_by_size' in data and data.get('sort_by_size'):
            queryset = queryset.order_by('size')
        if 'sort_in_desc' in data and data.get('sort_in_descending_order'):
            queryset = queryset.reverse()

        return queryset
    
    def get_shelter_or_seeker_queryset(self):
        pet_user = self.request.user
        if pet_user.is_shelter():
            return PetListing.objects.filter(shelter=pet_user)
        else:
            return PetListing.objects.all()