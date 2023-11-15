from django.urls import path
from .views import PetListingRetrieveUpdateDestroy
from .views import PetListingQueryList
from .views import PetListingCreate
from .views import PetListingList



app_name = 'pet_listings'
urlpatterns = [
    path('', PetListingCreate.as_view(), name='pet_listing_list'),
    path('list/', PetListingList.as_view(), name='pet_listing_list'),
    path('<int:pk>/', PetListingRetrieveUpdateDestroy.as_view(), name='pet_listing_retrieve_update_destroy'),
    path('search/', PetListingQueryList.as_view(), name='pet_listing_retrieve_update_destroy'),
]
