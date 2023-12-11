from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from pet_listings.serializers import PetListingListSerializer
from pet_listings.serializers.top_bread_serializer import TopBreedsChartSerializer
from pet_listings.serializers.creation_date_serializer import CreationDateSerializer
from pet_listings.pagination import PetListingPagination
from django.db.models import Count
from pet_listings.permissions import IsPetUser
from pet_listings.models import PetListing
from rest_framework.response import Response
from django.db.models.functions import TruncDay


class PetListingList(ListAPIView):
    serializer_class = PetListingListSerializer
    permission_classes = [IsPetUser]
    pagination_class = PetListingPagination
    # def get(self, request, *args, **kwargs):
    #     # Fetch PetListing data
    #     pet_listings = self.get_pet_listings(request.user)
    #     pet_listings_serializer = PetListingListSerializer(pet_listings, many=True)

    #     # Fetch Top Breeds data
    #     top_breeds = self.get_top_breeds()
    #     top_breeds_serializer = TopBreedsChartSerializer(top_breeds, many=True)

    #     # Combine data
    #     combined_data = {
    #         'pet_listings': pet_listings_serializer.data,
    #         'top_breeds': top_breeds_serializer.data
    #     }
    #     return Response(combined_data)

    # def get_pet_listings(self, user):
    #     if user.is_shelter():
    #         return PetListing.objects.filter(shelter=user)
    #     else:
    #         return PetListing.objects.all()

    # def get_top_breeds(self):
    #     return PetListing.objects.values('breed').annotate(count=Count('breed')).order_by('-count')[:10]
    
    
    
    # def get_queryset(self):
    #     # Check for a query parameter or condition to decide which data to return
    #     if self.request.query_params.get('top_breeds'):
    #         return self.get_top_breeds()
    #     else:
    #         return self.get_pet_listings()

    # def get_pet_listings(self):
    #     pet_user = self.request.user
    #     if pet_user.is_shelter():
    #         return PetListing.objects.filter(shelter=pet_user)
    #     else:
    #         return PetListing.objects.all()

    # def get_top_breeds(self):
    #     return PetListing.objects.values('breed').annotate(count=Count('breed')).order_by('-count')[:10]

    # def get_serializer_class(self):
    #     if self.request.query_params.get('top_breeds'):
    #         return TopBreedsChartSerializer
    #     return super().get_serializer_class()


    def get_queryset(self):
            if self.request.query_params.get('top_breeds'):
                return self.get_top_breeds()
            elif self.request.query_params.get('creation_stats'):
                return self.get_creation_stats()
            else:
                return self.get_pet_listings()

    def get_pet_listings(self):
        pet_user = self.request.user
        if pet_user.is_shelter():
            return PetListing.objects.filter(shelter=pet_user)
        else:
            return PetListing.objects.all()

    def get_top_breeds(self):
        return PetListing.objects.values('breed').annotate(count=Count('breed')).order_by('-count')[:10]

    def get_creation_stats(self):
        stats = PetListing.objects.annotate(date=TruncDay('publication_date')).values('date').annotate(count=Count('id')).order_by('date')
        return [{'date': stat['date'].strftime('%Y-%m-%d'), 'count': stat['count']} for stat in stats]

    def get_serializer_class(self):
        if self.request.query_params.get('top_breeds'):
            return TopBreedsChartSerializer
        elif self.request.query_params.get('creation_stats'):
            return CreationDateSerializer
        return super().get_serializer_class()

    def list(self, request, *args, **kwargs):
        if request.query_params.get('creation_stats'):
            queryset = self.get_creation_stats()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'creation_stats': serializer.data})

        return super().list(request, *args, **kwargs)


