from django.urls import path
from .views import PetListingListCreate, PetListingRetrieveUpdateDestroy

app_name = 'pet_listings'
urlpatterns = [
    path('user/pet_listings/', PetListingListCreate.as_view(), name='pet_listing_list_create'),
    path('user/pet_listings/<int:pk>/', PetListingRetrieveUpdateDestroy.as_view(), name='pet_listing_retrieve_update_destroy'),

]
