from django.urls import path
from .views import PetListingListCreate
from .views import PetListingRetrieveUpdateDestroy
from .views import PetListingQueryList

app_name = 'pet_listings'
urlpatterns = [
    path('user/pet_listings/', PetListingListCreate.as_view(), name='pet_listing_list'),
    path('user/pet_listings/<int:pk>/', PetListingRetrieveUpdateDestroy.as_view(), name='pet_listing_retrieve_update_destroy'),
    path('user/pet_listings/search/', PetListingQueryList.as_view(), name='pet_listing_retrieve_update_destroy'),
]
