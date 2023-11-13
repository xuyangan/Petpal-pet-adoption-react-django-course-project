from rest_framework.generics import ListAPIView
from pet_listings.models import PetListing
from accounts.models import PetUser
from django.shortcuts import get_object_or_404, redirect
from pet_listings.permissions import IsPetUser
from pet_listings.serializers import  PetListingQuerySerializer, PetListingListSerializer
from rest_framework.permissions import AllowAny


class PetListingQueryList(ListAPIView):
    serializer_class = PetListingListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        filters = PetListingQuerySerializer(data=self.request.query_params)
        queryset = PetListing.objects.none() 
        print(filters)
        if not filters.is_valid():
            print("PetListingQueryList: invalid filters")
            return PetListing.objects.all()
        
        data = filters.validated_data
        if 'shelter_name' in data:
            # find all shelters with the name
            shelters = PetUser.objects.filter(shelter_name__icontains=data['shelter_name'])
            # find all pet listings that belong to the shelters and add them to the queryset
            queryset = PetListing.objects.filter(shelter__in=shelters)
        else: 
            queryset = PetListing.objects.all()
        if 'breed' in data:
            queryset = queryset.filter(breed__icontains=data['breed'])
        if 'status' in data:
            queryset = queryset.filter(status=data['status'])
        if 'size' in data:
            queryset = queryset.filter(size=data['size'])
        if 'age' in data:
            queryset = queryset.filter(age=data['age'])
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